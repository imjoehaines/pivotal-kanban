import getToken from './get-token'
import {ROOT_URL} from '../constants'
import checkForFetchErrors from './check-for-fetch-errors'
import handleFetchErrors from './handle-fetch-errors'

const token = getToken(localStorage)

const asGetParameters = (parameters: Record<string, string>) =>
    '?' + new URLSearchParams(parameters)


export default (path: string, parameters: Record<string, string>) =>
    fetch(ROOT_URL + path + asGetParameters(parameters), {
        headers: {
            'X-TrackerToken': token
        }
    })
        .then(checkForFetchErrors)
        .catch(handleFetchErrors)
