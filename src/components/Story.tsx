import React from 'react'

import {PivotalStoryResponse} from '../api/types/pivotal-story-response'

import './Story.css'

type Props = {
    story: PivotalStoryResponse,
    projects: Map<number, string>
}

export default (props: Props) => {
    const {story, projects} = props

    return (
        <div className={`Story Story--${story.story_type}`}>
            {!!story.estimate && (
                <span className="Story__estimate">{story.estimate}</span>
            )}

            <h3 className="Story__heading">
                {story.name}
            </h3>


            {projects.has(story.project_id) && (
                <p className="Story__project">{projects.get(story.project_id)}</p>
            )}
        </div>
    )
}
