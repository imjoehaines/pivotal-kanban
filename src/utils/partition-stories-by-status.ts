import {Status} from '../types/status'
import {PivotalStoryResponse} from '../types/pivotal-story-response'

type PartitionedStories = {
    [Status.Unstarted]: PivotalStoryResponse[],
    [Status.Started]: PivotalStoryResponse[],
    [Status.Finished]: PivotalStoryResponse[],
    [Status.Delivered]: PivotalStoryResponse[],
}

const pivotalStateToStatus = (pivotalState: string): Status | null => {
    switch (pivotalState) {
        case 'unstarted':
            return Status.Unstarted

        case 'started':
            return Status.Started

        case 'finished':
            return Status.Finished

        case 'delivered':
            return Status.Delivered
    }

    return null
}

export default (stories: PivotalStoryResponse[]): PartitionedStories => {
    return stories.reduce((acc: any, story) => {
        const status = pivotalStateToStatus(story.current_state)

        if (!status) {
            return acc
        }

        if (!acc[status]) {
            acc[status] = []
        }

        acc[status].push(story)

        return acc
    }, {})
}
