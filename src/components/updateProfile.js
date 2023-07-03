import React, { useState } from 'react'
import Loginauth from './loginauth'
import Nav from './nav'
import { useLocation } from 'react-router-dom'
function UpdateProfile() {
    const session = JSON.parse(sessionStorage.getItem("user"))
    const { state } = useLocation()
    const [credentials, setCredentials] = useState(session)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/updateUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: credentials.uid,
                userName: credentials.userName,
                email: credentials.email,
                type: credentials.type
            })
        });
        const json = await response.json()
        if (json.userName) {
            alert("update successfully")
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
            <Loginauth type={state.type} />
            <Nav type={state.type} />

            <div className="loginForm adduser">
                <form className="form" method="post" onSubmit={handleSubmit}>
                    <div className="form-fields reg">
                        <label htmlFor='uid' >User ID:-</label>
                        <input type="text" className="form-text disable" name='uid' value={credentials.uid} id='uid' disabled required placeholder="Enter uid" />
                    </div>
                    <div className="form-fields reg">
                        <label htmlFor='userName' >User Name:-</label>
                        <input type="text" className="form-text" name='userName' value={credentials.userName} id='userName' onChange={onChange} required placeholder="Enter Username" />
                    </div>
                    <div className="form-fields reg">
                        <label htmlFor='email' >Email ID:-</label>
                        <input type="text" className="form-text" name='email' value={credentials.email} id='email' onChange={onChange} required placeholder="Enter email" />
                    </div>
                    <div className="form-fields reg">
                        <label htmlFor='type' >User Role:-</label>
                        <input type="text" className="form-text disable" name='type' value={credentials.type} disabled id='type' required placeholder="Enter user type" />
                    </div>
                    <input type="submit" className="form-btn" value="Create" />
                </form>
            </div>
        </>
    )
}

export default UpdateProfile