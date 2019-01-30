import getToken from './get-token'
import {ROOT_URL} from '../constants'
import checkForFetchErrors from './check-for-fetch-errors'
import handleFetchErrors from './handle-fetch-errors'

const token = getToken(localStorage)

export default (path: string) =>
    fetch(ROOT_URL + path, {
        headers: {
            'X-TrackerToken': token
        }
    })
        .then(checkForFetchErrors)
        .catch(handleFetchErrors)
