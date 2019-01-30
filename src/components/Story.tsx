import React from 'react'

import {PivotalStoryResponse} from '../api/types/pivotal-story-response'

type Props = {
    story: PivotalStoryResponse
}

export default (props: Props) =>
    <p>{props.story.name}</p>
