import {Status} from '../types/status'
import {PivotalStoryResponse} from '../types/pivotal-story-response'
import pivotalStateToStatus from './pivotal-state-to-status'

type PartitionedStories = {
    [Status.Unstarted]: PivotalStoryResponse[],
    [Status.Started]: PivotalStoryResponse[],
    [Status.Finished]: PivotalStoryResponse[],
    [Status.Delivered]: PivotalStoryResponse[],
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
