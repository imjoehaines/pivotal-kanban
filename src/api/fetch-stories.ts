import {PROJECT_IDS} from '../constants'
import {PivotalStoryResponse} from './types/pivotal-story-response'
import fetch from '../utils/fetch'

export default (): Promise<PivotalStoryResponse>[] =>
    PROJECT_IDS.map(projectId =>
        fetch(
            `/projects/${projectId}/stories`,
            {
                filter: 'state:started,finished,delivered,unstarted AND type:feature,bug,chore'
            }
        )
            .then((response: Response | Error) => {
                    if (response instanceof Error) {
                        throw response
                    }

                    return response.json()
                }
            )
            .then(response => response as PivotalStoryResponse)
    )
