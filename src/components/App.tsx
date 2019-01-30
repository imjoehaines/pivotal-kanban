import React, {Component} from 'react'

import fetchStories from '../api/fetch-stories'
import {PivotalStoryResponse} from '../api/types/pivotal-story-response'

import './App.css'

type Props = {}

type State = {
    stories: PivotalStoryResponse[]
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

        return (
            <div>
                {stories.map(story => <p key={story.id}>{story.name}</p>)}
            </div>
        )
    }
}

export default App
