type StoryType
    = 'feature'
    | 'bug'
    | 'chore'
    | 'release'

type CurrentState
    = 'accepted'
    | 'delivered'
    | 'finished'
    | 'started'
    | 'rejected'
    | 'planned'
    | 'unstarted'
    | 'unscheduled'

type Label = {
    id: number,
    project_id: number,
    kind: string,
    name: string,
    created_at: number,
    updated_at: number
}

export type PivotalStoryResponse = {
    kind: string,
    id: number,
    created_at: number,
    updated_at: number,
    estimate: number,
    story_type: StoryType,
    name: string,
    descriptions: string,
    current_state: CurrentState,
    requested_by_id: number,
    url: string,
    project_id: number,
    owner_ids: number[],
    owned_by_id: number,
    labels: Label[]
}

