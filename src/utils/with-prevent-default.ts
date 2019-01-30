import {SyntheticEvent} from 'react'

export default <T extends SyntheticEvent>(fn: (event: T) => void) => (event: T) => {
    event.preventDefault()

    fn(event)
}
