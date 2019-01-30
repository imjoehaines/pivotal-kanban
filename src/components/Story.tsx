import React from 'react'

import {PivotalStoryResponse} from '../api/types/pivotal-story-response'

import './Story.css'

type Props = {
    story: PivotalStoryResponse
}

export default (props: Props) => {
    return (
        <div className="Story">
            <span className="Story__type">
                {props.story.story_type === 'bug' && '🐞'}
                {props.story.story_type === 'feature' && '⭐️'}
            </span>

            <h3 className="Story__heading">
                {props.story.name}
            </h3>
        </div>
    )
}
