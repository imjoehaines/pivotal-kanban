import React, {Component} from 'react'

import Column from './Column'
import Filters from './Filters'
import fetchStories from '../api/fetch-stories'
import {CurrentState, PivotalStoryResponse} from '../api/types/pivotal-story-response'

import './App.css'
import {PROJECT_MAP} from '../constants'

type Props = {}

type State = {
    stories: PivotalStoryResponse[],
    selectedProjectId: number
}

type PartitionedStories = {
    [k in keyof CurrentState]: PivotalStoryResponse[]
}

class App extends Component<Props, State> {
    state = {
        // I don't know why we need to tell typescript this when it's in the type itself, but if this is missing then
        // it decides state.stories is of type `never[]`, so you can't use the array at all...
        stories: [] as PivotalStoryResponse[],
        selectedProjectId: -1
    }

    componentDidMount(): void {
        Promise.all(fetchStories())
            .then((stories) => {
                this.setState(() => ({stories: stories.flat()}))
            })
    }

    private handleProjectFilterChange = (projectId: number) => {
        this.setState(() => ({selectedProjectId: projectId}))
    }

    render() {
        const {stories, selectedProjectId} = this.state

        if (stories.length === 0) {
            return <div className="App__loading"><h2>Loading&hellip;</h2></div>
        }

        const filteredStories = stories.filter(story => selectedProjectId === -1 || story.project_id === selectedProjectId)

        const partitionedStories = filteredStories.reduce((acc: any, story) => {
            if (!acc[story.current_state]) {
                acc[story.current_state] = []
            }

            acc[story.current_state].push(story)

            return acc
        }, {})

        return (
            <div className="App">
                {Object.keys(partitionedStories as PartitionedStories)
                    .map(status =>
                        <Column key={status}
                                status={status as CurrentState}
                                stories={partitionedStories[status]}
                                projects={PROJECT_MAP}
                                selectedProjectId={selectedProjectId}
                        />
                    )}

                <Filters projects={PROJECT_MAP} onProjectFilterChange={this.handleProjectFilterChange}/>
            </div>
        )
    }
}

export default App
