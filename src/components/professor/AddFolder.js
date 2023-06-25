import React, { useState } from 'react'
import Loginauth from '../loginauth'
import { useLocation } from 'react-router-dom'
function AddFolder() {
    let { state } = useLocation();
    var folder = {
        folderName: ""
    };
    const [credentials, setCredentials] = useState(folder)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/addFolder", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fid: credentials.folderName.concat(" ", state.subcode),
                folderName: credentials.folderName,
                subcode: state.subcode,
                subName: state.subName
            })
        });
        const json = await response.json()
        if (json.folderName) {
            alert("Folder Created")
        }
        else if (json.error) {
            alert(json.error)
        }
        else if (json.errors) {
            alert(json.errors[0].msg);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <Loginauth type="teacher" />
            <h2>Create Course</h2>
            <form method="post" onSubmit={handleSubmit}>
                <label htmlFor='folderName'>folder Name:-</label>
                <input type="text" name='folderName' id='folderName' value={credentials.folderName} onChange={onChange} required placeholder='Name of folder' />

                <input type='submit' name='submit' />
            </form>
        </>
    )
}

export default AddFolder