import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {
    const [credentials, setCredentials] = useState({ userName: "" })
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName: credentials.userName })
        });
        const json = await response.json()
        console.log(json);
        if (json.userName) {
            console.log(json);
            // Save the auth token and redirect
            sessionStorage.setItem('user', JSON.stringify(json));
            // const User = JSON.parse(sessionStorage.getItem("user"));
            history("/home");
        }
        else {
            alert(json.error);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="loginForm">
            <form className="form" method="post" onSubmit={handleSubmit}>
                <div className="input-fields">
                    <span className="material-symbols-outlined">account_circle</span>
                    <input type="text" className="form-text" name='userName' id='userName' onChange={onChange} placeholder="Enter Username" />
                </div>
                <input type="submit" className="form-btn" value="Verify" />
            </form>
        </div>
    )
}
export default Login;