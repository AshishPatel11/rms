import React from 'react'
import { useLocation } from 'react-router-dom'
function FolderData() {
    let { state } = useLocation()
    return (
        <div>FolderData {state.folderName}</div>
    )
}

export default FolderData