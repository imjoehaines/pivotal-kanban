import React, {Component} from 'react'

import Column from './Column'
import fetchStories from '../api/fetch-stories'
import {CurrentState, PivotalStoryResponse} from '../api/types/pivotal-story-response'

import './App.css'
import {PROJECT_MAP} from '../constants'

type Props = {}

type State = {
    stories: PivotalStoryResponse[]
}

type PartitionedStories = {
    [k in keyof CurrentState]: PivotalStoryResponse[]
}

class App extends Component<Props, State> {
    state = {
        // I don't know why we need to tell typescript this when it's in the type itself, but if this is missing then
        // it decides state.stories is of type `never[]`, so you can't use the array at all...
        stories: [] as PivotalStoryResponse[]
    }

    componentDidMount(): void {
        Promise.all(fetchStories())
            .then((stories) => {
                    this.setState(oldState => ({
                        ...oldState,
                        stories: stories.flat()
                    }))
                }
            )
    }

    render() {
        const {stories} = this.state

        if (stories.length === 0) {
            return <p>Loading&hellip;</p>
        }

        const partitionedStories = stories.reduce((acc: any, story) => {
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
                        />
                    )}
            </div>
        )
    }
}

export default App
