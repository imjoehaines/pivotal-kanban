import React, {Component} from 'react'
import {DragDropContext, DragUpdate} from 'react-beautiful-dnd'

import Column from './Column'
import Filters from './Filters'
import fetchUsers from '../api/fetch-users'
import fetchStories from '../api/fetch-stories'
import {PivotalStoryResponse} from '../types/pivotal-story-response'
import {PROJECT_MAP} from '../constants'
import {PivotalUserResponse} from '../types/pivotal-user-response'
import {Status} from '../types/status'
import partitionStoriesByStatus from '../utils/partition-stories-by-status'
import statusToPivotalState from '../utils/status-to-pivotal-state'

import './App.css'

type Props = {}

type State = {
    stories: PivotalStoryResponse[],
    selectedProjectId: number,
    users: Map<number, string>,
    selectedUserId: number,
    selectedStoryId: number,
}

class App extends Component<Props, State> {
    state = {
        // I don't know why we need to tell typescript this when it's in the type itself, but if this is missing then
        // it decides state.stories is of type `never[]`, so you can't use the array at all...
        stories: [] as PivotalStoryResponse[],
        selectedProjectId: -1,
        users: new Map(),
        selectedUserId: -1,
        selectedStoryId: -1,
    }

    componentDidMount(): void {
        const storyPromises = fetchStories()
        const userPromises = fetchUsers()

        Promise.all(storyPromises)
            .then((stories) => {
                // assign each story a global index so we can keep track of stories to drag and drop them
                const allStories = stories.flat().map((story, index) => ({...story, globalIndex: index}))

                this.setState(() => ({stories: allStories}))

                const ownerIds = allStories.map((story: PivotalStoryResponse) => story.owned_by_id)

                Promise.all(userPromises)
                    .then((users) => {
                        this.setState(() => ({
                            users: users.flat().reduce((userMap: Map<number, string>, user: PivotalUserResponse) => {
                                if (ownerIds.includes(user.person.id) && !userMap.has(user.person.id)) {
                                    userMap.set(user.person.id, user.person.name)
                                }

                                return userMap
                            }, new Map())
                        }))
                    })
            })
    }

    private handleProjectFilterChange = (projectId: number) => {
        this.setState(() => ({selectedProjectId: projectId}))
    }

    private handleUserFilterChange = (userId: number) => {
        this.setState(() => ({selectedUserId: userId}))
    }

    private handleStoryClick = (storyId: number) => {
        this.setState(() => ({selectedStoryId: storyId}))
    }

    private closeStory = () => {
        this.setState(() => ({selectedStoryId: -1}))
    }

    private handleDragEnd = (result: DragUpdate) => {
        console.log(result)

        // didn't drop the draggable on a thing so we don't care
        if (!result.destination) {
            return
        }

        const stories = Array.from(this.state.stories)
        const [removedStory] = stories.splice(result.source.index, 1)

        // TODO this is temporary until we can POST to PT and update stories for real
        const newStatus = statusToPivotalState(result.destination.droppableId as Status)

        // not a valid status for some reason, this shouldn't really ever happen
        if (newStatus === null) return

        removedStory.current_state = newStatus

        // @ts-ignore
        removedStory.globalIndex = result.destination.index
        // -- end temporary stuff

        stories.splice(result.destination.index, 0, removedStory)

        this.setState(() => ({stories}))
    }

    private applyFilters(stories: PivotalStoryResponse[], selectedProjectId: number, selectedUserId: number): PivotalStoryResponse[] {
        return stories
            .filter(story => selectedProjectId === -1 || story.project_id === selectedProjectId)
            .filter(story => selectedUserId === -1 || story.owner_ids.includes(selectedUserId))
    }

    render() {
        const {stories, selectedProjectId, users, selectedUserId, selectedStoryId} = this.state

        if (stories.length === 0) {
            return <div className="App__loading"><h2>Loading&hellip;</h2></div>
        }

        const filteredStories = this.applyFilters(stories, selectedProjectId, selectedUserId)

        const partitionedStories = partitionStoriesByStatus(filteredStories)

        return (
            <div className="App">
                <DragDropContext onDragEnd={this.handleDragEnd}>
                    {[Status.Unstarted, Status.Started, Status.Finished, Status.Delivered]
                        .map(status =>
                            <Column key={status}
                                    status={status}
                                    stories={partitionedStories[status]}
                                    projects={PROJECT_MAP}
                                    selectedProjectId={selectedProjectId}
                                    users={users}
                                    selectedUserId={selectedUserId}
                                    selectedStoryId={selectedStoryId}
                                    onStoryClick={this.handleStoryClick}
                                    closeStory={this.closeStory}
                            />
                        )}
                </DragDropContext>

                <Filters
                    projects={PROJECT_MAP}
                    onProjectFilterChange={this.handleProjectFilterChange}
                    users={users}
                    onUserFilterChange={this.handleUserFilterChange}
                />
            </div>
        )
    }
}

export default App
