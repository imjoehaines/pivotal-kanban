import React from 'react'

import Story from './Story'
import {CurrentState, PivotalStoryResponse} from '../api/types/pivotal-story-response'

import './Column.css'

type Props = {
    status: CurrentState,
    stories: PivotalStoryResponse[],
    projects: Map<number, string>,
    selectedProjectId: number,
    users: Map<number, string>,
    selectedUserId: number,
    selectedStoryId: number,
    onStoryClick: (storyId: number) => void
}

export default (props: Props) => {
    return (
        <div className="Column">
            <h2 className="Column__heading">{props.status}</h2>

            {props.stories.map((story: PivotalStoryResponse) =>
                <Story key={story.id}
                       story={story}
                       projects={props.projects}
                       selectedProjectId={props.selectedProjectId}
                       users={props.users}
                       selectedUserId={props.selectedUserId}
                       isOpen={props.selectedStoryId === story.id}
                       onClick={props.onStoryClick}
                />
            )}
        </div>
    )
}
