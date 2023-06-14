import React, { useState } from 'react'
import Loginauth from '../loginauth'
const AddUser = (props) => {
    var user = {
        uid: "",
        userName: "",
        email: "",
        password: "",
        type: ""
    };
    const [credentials, setCredentials] = useState(user)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/adduser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: credentials.uid,
                userName: credentials.userName,
                email: credentials.email,
                password: credentials.password,
                type: credentials.type
            })
        });
        const json = await response.json()
        if (json.userName) {
            alert("registration success")
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
            <Loginauth />
            <div className="loginForm">
                <form className="form"metho d="post" onSubmit={handleSubmit}>
                    <div className="input-fields reg">
                        <input type="text" className="form-text" name='uid' value={credentials.uid} id='uid' onChange={onChange} required placeholder="Enter uid" />
                    </div>
                    <div className="input-fields reg">
                        <input type="text" className="form-text" name='userName' value={credentials.userName} id='userName' onChange={onChange} required placeholder="Enter Username" />
                    </div>
                    <div className="input-fields reg">
                        <input type="text" className="form-text" name='email' value={credentials.email} id='email' onChange={onChange} required placeholder="Enter email" />
                    </div>
                    <div className="input-fields reg">
                        <input type="text" className="form-text" name='password' value={credentials.password} id='password' onChange={onChange} required placeholder="Enter password" />
                    </div>
                    <div className="input-fields reg">
                        <input type="text" className="form-text" name='type' value={credentials.type} id='type' onChange={onChange} required placeholder="Enter user type" />
                    </div>
                    <input type="submit" className="form-btn" value="Verify" />
                </form>
            </div>
        </>
    )
}

export default AddUser