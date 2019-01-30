import React from 'react'

import {PivotalStoryResponse} from '../api/types/pivotal-story-response'

import './Story.css'

type Props = {
    story: PivotalStoryResponse
}

export default (props: Props) => {
    return (
        <div className={`Story Story--${props.story.story_type}`}>
            {!!props.story.estimate && (
                <span className="Story__estimate">{props.story.estimate}</span>
            )}

            <h3 className="Story__heading">
                {props.story.name}
            </h3>
        </div>
    )
}
