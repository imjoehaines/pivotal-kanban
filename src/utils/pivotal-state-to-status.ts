import {Status} from '../types/status'

export default (pivotalState: string): Status | null => {
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
