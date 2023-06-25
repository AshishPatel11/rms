import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Loginauth from '../loginauth'
function FolderData() {
    let { state } = useLocation()
    // var folder = {
    //     folderName: ""
    // };
    // const [credentials, setCredentials] = useState(folder)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', e.target.file.files[0]);
        const response = await fetch("http://localhost:5000/upload", {
            method: 'POST',
            body: formData
        });
        const json = await response.json()
        console.log(json.id)
        if (json.id) {
            const response2 = await fetch("http://localhost:5000/api/auth/filedata",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fileid: json.id,
                        fileName: json.fileName,
                        subcode: state.subcode,
                        fid: state.fid
                    })
                });
            const filedata = await response2.json();
            if (filedata.fileid) {
                alert("file uploaded successfully")
            }
        }

    }

    return (
        <>
            <Loginauth type="teacher" />
            <h2>Create Course</h2>
            <form method="post" onSubmit={handleSubmit}>
                <label htmlFor='file'>Choose File:-</label>
                <input type="file" name='file' id='file' required />
                <input type='submit' name='submit' />
            </form>
        </>
    )
}

export default FolderData