import React from 'react'

import {PivotalStoryResponse} from '../api/types/pivotal-story-response'

import './Story.css'

type Props = {
    story: PivotalStoryResponse,
    projects: Map<number, string>,
    selectedProjectId: number,
    users: Map<number, string>,
    selectedUserId: number,
    isOpen: boolean,
    onClick: (storyId: number) => void
}

export default (props: Props) => {
    const {story, projects, selectedProjectId, users, selectedUserId, isOpen, onClick} = props

    return (
        <div
            className={`Story Story--${story.story_type}${isOpen ? ' Story--open' : ''}`}
            onClick={() => isOpen || onClick(story.id)}
        >
            {!!story.estimate && (
                <span className="Story__estimate">{story.estimate}</span>
            )}

            <h3 className="Story__heading">
                {story.name}
            </h3>

            {isOpen && (
                <div className="Story__body">
                    {(story.description || '')
                        .split('\n')
                        .filter(line => !!line.trim())
                        .map((line, index) => <p key={index}>{line}</p>)
                    }

                    <p>
                        <a title="Open in Pivotal Tracker"
                           href={`https://www.pivotaltracker.com/story/show/${story.id}`}
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                            Open in Pivotal Tracker
                        </a>
                    </p>
                </div>
            )}

            <div className="Story__metadata">
                {selectedUserId === -1 && users.has(story.owned_by_id)
                    ? <span className="Story__metadata-item">{users.get(story.owned_by_id)}</span>
                    : <span/> /* empty span to reserve the grid column */
                }

                {selectedProjectId === -1 && projects.has(story.project_id) && (
                    <span className="Story__project">{projects.get(story.project_id)}</span>
                )}
            </div>
        </div>
    )
}
