import React from 'react'
import { useLocation } from 'react-router-dom'
function ShowSubs() {
    let { state } = useLocation();
    return (
        <div>ShowSubs{state.subName}</div>
    )
}

export default ShowSubs