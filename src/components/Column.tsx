import React from 'react'

import Story from './Story'
import {CurrentState, PivotalStoryResponse} from '../api/types/pivotal-story-response'

import './Column.css'

type Props = {
    status: CurrentState,
    stories: PivotalStoryResponse[]
}

export default (props: Props) => {
    return (
        <div className="Column">
            <h2 className="Column__heading">{props.status}</h2>

            {props.stories.map((story: PivotalStoryResponse) =>
                <Story key={story.id}
                       story={story}
                />
            )}
        </div>
    )
}
