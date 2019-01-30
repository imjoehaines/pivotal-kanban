import {Status} from '../types/status'
import {CurrentState} from '../types/pivotal-story-response'

export default (status: Status): CurrentState | null => {
    switch (status) {
        case Status.Unstarted:
            return 'unstarted'

        case Status.Started:
            return 'started'

        case Status.Finished:
            return 'finished'

        case Status.Delivered:
            return 'delivered'
    }

    return null
}
