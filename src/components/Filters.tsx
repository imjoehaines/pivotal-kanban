import React from 'react'

import './Filters.css'

type Props = {
    projects: Map<number, string>,
    onProjectFilterChange: (projectId: number) => void
}

export default (props: Props) => {
    const {projects, onProjectFilterChange} = props

    let options = [
        <option key={-1} value={-1}>-- All --</option>
    ]

    for (const [id, name] of projects) {
        options.push(
            <option key={id} value={id}>{name}</option>
        )
    }

    return (
        <div className="Filters">
            Filter by project: <select onChange={event => onProjectFilterChange(+event.target.value)}>{options}</select>
        </div>
    )
}
