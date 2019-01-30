import React from 'react'

import './Filters.css'

type Props = {
    projects: Map<number, string>,
    onProjectFilterChange: (projectId: number) => void,
    users: Map<number, string>,
    onUserFilterChange: (userId: number) => void,
}

export default (props: Props) => {
    const {projects, onProjectFilterChange, users, onUserFilterChange} = props

    let projectOptions = [
        <option key={-1} value={-1}>-- All --</option>
    ]

    for (const [id, name] of projects) {
        projectOptions.push(
            <option key={id} value={id}>{name}</option>
        )
    }

    let userOptions = [
        <option key={-1} value={-1}>-- All --</option>
    ]

    for (const [id, name] of users) {
        userOptions.push(
            <option key={id} value={id}>{name}</option>
        )
    }

    return (
        <div className="Filters">
            <span className="Filters__filter">
                Filter by project: <select onChange={event => onProjectFilterChange(+event.target.value)}>{projectOptions}</select>
            </span>

            <span className="Filters__filter">
                Filter by owner: <select onChange={event => onUserFilterChange(+event.target.value)}>{userOptions}</select>
            </span>
        </div>
    )
}
