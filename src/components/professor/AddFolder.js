import React, { useState } from 'react'
import Loginauth from '../loginauth'
import { useLocation } from 'react-router-dom'
import Nav from '../nav';
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
                fid: credentials.folderName.concat("-", state.subcode),
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
            <Nav type="teacher" />
            <h2 className='title'>Create Folder</h2>
            <div className="loginForm">
                <form className='form' method="post" onSubmit={handleSubmit}>
                    <div className='form-fields'>
                        <label htmlFor='folderName'>Folder Name:-</label>
                        <input type="text" className="form-text" name='folderName' id='folderName' value={credentials.folderName} onChange={onChange} required placeholder='Name of folder' />
                    </div>
                    <input type='submit' className='form-btn' name='submit' />
                </form>
            </div>
        </>
    )
}

export default AddFolder