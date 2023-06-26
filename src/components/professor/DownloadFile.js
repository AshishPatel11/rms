import React from 'react'
import { useLocation } from 'react-router-dom'
function DownloadFile() {
    let { state } = useLocation()
    console.log(state)
    const download = async () => {
        try {
            const response = await fetch(`http://localhost:5000//fileinfo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subcode: state.subcode }),
            });
            const json = await response.json();
            if (json.error) {
                alert(json.error);
            }
            return json;
        } catch (error) {
            console.log('Error fetching files:', error);
        }
    }
    return (
        <>
        </>
    )
}

export default DownloadFile