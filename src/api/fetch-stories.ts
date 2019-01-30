import {PROJECT_IDS} from '../constants'
import {PivotalStoryResponse} from './types/pivotal-story-response'
import fetch from '../utils/fetch'

export default (): Promise<PivotalStoryResponse>[] =>
    PROJECT_IDS.map(projectId =>
        fetch(`/projects/${projectId}/stories`)
            .then((response: Response | Error) => {
                    if (response instanceof Error) {
                        throw response
                    }

                    return response.json()
                }
            )
            .then(response => response as PivotalStoryResponse)
    )
