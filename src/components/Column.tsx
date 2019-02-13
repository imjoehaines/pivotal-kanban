import React from 'react'

import Story from './Story'
import {PivotalStoryResponse} from '../types/pivotal-story-response'
import {Status} from '../types/status'

import './Column.css'

type Props = {
    status: Status,
    stories: PivotalStoryResponse[] | null,
    projects: Map<number, string>,
    selectedProjectId: number,
    users: Map<number, string>,
    selectedUserId: number,
    selectedStoryId: number,
    onStoryClick: (storyId: number) => void,
    closeStory: () => void,
}

const sumStoryPoints = (stories: PivotalStoryResponse[]) =>
    stories.reduce(
        (sum: number, story: PivotalStoryResponse) => sum + (story.estimate || 0),
        0
    )

export default (props: Props) => {
    return (
        <div className="Column">
            <h2 className="Column__heading">
                {props.status}

                <small className="Column__story-count" title="Number of stories">
                    {props.stories ? props.stories.length : 0}
                </small>

                <span className="Column__story-points" title="Total story points">
                    {props.stories ? sumStoryPoints(props.stories) : null}
                </span>
            </h2>

            {(props.stories || []).map((story: PivotalStoryResponse) =>
                <Story key={story.id}
                       story={story}
                       projects={props.projects}
                       selectedProjectId={props.selectedProjectId}
                       users={props.users}
                       selectedUserId={props.selectedUserId}
                       isOpen={props.selectedStoryId === story.id}
                       onClick={props.onStoryClick}
                       closeStory={props.closeStory}
                />
            )}
        </div>
    )
}
