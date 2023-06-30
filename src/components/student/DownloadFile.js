import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
function DownloadFile() {
    let { state } = useLocation()
    let navigate = useNavigate()
    console.log(state)
    const download = async (callback) => {
        try {
            const response = await fetch(`http://localhost:5000/fileinfo/${state.fileid}`, {
                method: 'GET'
            });
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', state.fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                throw new Error('Failed to download file');
            }
            console.log(response)
        } catch (error) {
            console.log('Error fetching files:', error);
        }
        callback();
    }
    download(() => {
        navigate(-1)
    })
    return (
        <>
        </>
    )
}

export default DownloadFile