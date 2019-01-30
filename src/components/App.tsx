import React, {Component} from 'react'

import Column from './Column'
import Filters from './Filters'
import fetchUsers from '../api/fetch-users'
import fetchStories from '../api/fetch-stories'
import {CurrentState, PivotalStoryResponse} from '../api/types/pivotal-story-response'
import {PROJECT_MAP} from '../constants'
import {PivotalUserResponse} from '../api/types/pivotal-user-response'

import './App.css'

type Props = {}

type State = {
    stories: PivotalStoryResponse[],
    selectedProjectId: number,
    users: Map<number, string>,
    selectedUserId: number,
}

type PartitionedStories = {
    [k in keyof CurrentState]: PivotalStoryResponse[]
}

class App extends Component<Props, State> {
    state = {
        // I don't know why we need to tell typescript this when it's in the type itself, but if this is missing then
        // it decides state.stories is of type `never[]`, so you can't use the array at all...
        stories: [] as PivotalStoryResponse[],
        selectedProjectId: -1,
        users: new Map(),
        selectedUserId: -1
    }

    componentDidMount(): void {
        Promise.all(fetchStories())
            .then((stories) => {
                this.setState(() => ({stories: stories.flat()}))
            })

        Promise.all(fetchUsers())
            .then((users) => {
                this.setState(() => ({
                    users: users.flat().reduce((userMap: Map<number, string>, user: PivotalUserResponse) => {
                        if (!userMap.has(user.person.id)) {
                            userMap.set(user.person.id, user.person.name)
                        }

                        return userMap
                    }, new Map())
                }))
            })
    }

    private handleProjectFilterChange = (projectId: number) => {
        this.setState(() => ({selectedProjectId: projectId}))
    }

    private handleUserFilterChange = (userId: number) => {
        this.setState(() => ({selectedUserId: userId}))
    }

    private applyFilters(stories: PivotalStoryResponse[], selectedProjectId: number, selectedUserId: number): PivotalStoryResponse[] {
        return stories
            .filter(story => selectedProjectId === -1 || story.project_id === selectedProjectId)
            .filter(story => selectedUserId === -1 || story.owner_ids.includes(selectedUserId))
    }

    private partitionStoriesByStatus(stories: PivotalStoryResponse[]): PartitionedStories {
        return stories.reduce((acc: any, story) => {
            if (!acc[story.current_state]) {
                acc[story.current_state] = []
            }

            acc[story.current_state].push(story)

            return acc
        }, {})
    }

    render() {
        const {stories, selectedProjectId, users, selectedUserId} = this.state

        if (stories.length === 0) {
            return <div className="App__loading"><h2>Loading&hellip;</h2></div>
        }

        const filteredStories = this.applyFilters(stories, selectedProjectId, selectedUserId)

        const partitionedStories = this.partitionStoriesByStatus(filteredStories)

        return (
            <div className="App">
                {Object.keys(partitionedStories)
                    .map(status =>
                        <Column key={status}
                                status={status as CurrentState}
                                stories={partitionedStories[status as any] as PivotalStoryResponse[]}
                                projects={PROJECT_MAP}
                                selectedProjectId={selectedProjectId}
                                users={users}
                                selectedUserId={selectedUserId}
                        />
                    )}

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
