import React, { useState } from 'react'
import Lottie from 'lottie-react'
import animationData from '../images/97952-loading-animation-blue.json'
import { useNavigate } from 'react-router-dom'
import Nav from './nav'

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "" })
    const [loading, setLoading] = useState(false)
    let history = useNavigate();

    const handleSubmit = async (e) => {
        console.log("done")
        e.preventDefault();
        setLoading(true)
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email })
        });
        const json = await response.json()
        if (json[0].userName) {
            // Save the auth token and redirect
            sessionStorage.setItem('user', JSON.stringify(json[0]));
            sessionStorage.setItem('OTP', JSON.stringify(json[1]));
            history("/home");
        }
        else {
            alert(json.error);
        }
        setLoading(false)
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const style = {
        height: "92vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: " blur(2px)",
        fontSize: "100px"
    }
    const style2 = {
        height: "40vh",
    }
    return (
        <>
            <Nav type="default" />
            <div className="loginForm">
                <form className="form" method="post" onSubmit={handleSubmit}>
                    <div className="input-fields">
                        <span className="material-symbols-outlined">account_circle</span>
                        <input type="email" className="form-text" name='email' autoComplete='on' id='email' value={credentials.email} onChange={onChange} placeholder="Enter Your Email" />
                    </div>
                    <input type="submit" className="form-btn" value="Verify" />
                </form>
            </div >

            {loading && <div style={style}> <Lottie style={style2} animationData={animationData}></Lottie></div>}

        </>
    )
}
export default Login;