import {PROJECT_IDS} from '../constants'
import {PivotalUserResponse} from '../types/pivotal-user-response'
import fetch from '../utils/fetch'

export default (): Promise<PivotalUserResponse>[] =>
    PROJECT_IDS.map(projectId =>
        fetch(`/projects/${projectId}/memberships`, {sort_by: 'name'})
            .then((response: Response | Error) => {
                    if (response instanceof Error) {
                        throw response
                    }

                    return response.json()
                }
            )
            .then(response => response as PivotalUserResponse)
    )
