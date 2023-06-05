import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: ""})
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: credentials.username})
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            history.push("/");

        }
        else {
            alert("Invalid credentials");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="loginForm">
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-fields">
                    <span className="material-symbols-outlined">account_circle</span>
                    <input type="text" className="form-text" onChange={onChange} placeholder="Enter Username" />
                </div>
                <input type="submit" className="form-btn" value="Verify" />
            </form>
        </div>
    )
}
export default Login;