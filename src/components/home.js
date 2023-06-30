import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loginauth from './loginauth';
import Nav from './nav';
const Home = (props) => {
    const [credentials, setCredentials] = useState({ OTP: "" })
    let navigate = useNavigate();
    const auth = async () => {
        if (sessionStorage.getItem('user')) {
            const User = await JSON.parse(sessionStorage.getItem("user"));
            if (User.type === "admin") {
                navigate("/home/adminDash", { replace: true })
            }
            else if (User.type === "student") {
                navigate("/home/studentDash", { replace: true })
            }
            else if (User.type === "teacher") {
                navigate("/home/teacherDash", { replace: true })
            }
            else {
                navigate("/404", { replace: true })
            }
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const OTP = await JSON.parse(sessionStorage.getItem("OTP"));
        console.log(OTP)
        if (credentials.OTP === OTP) {
            alert("OTP Verified !!")
            auth();
        }
        else {
            alert("wrong OTP Entered !!")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <Loginauth />
            <Nav type="default" />
            <div className="loginForm">
                <form className="form" method="post" onSubmit={handleSubmit}>
                    <div className="input-fields">
                        <span className="material-symbols-outlined">lock</span>
                        <input type="number" className="form-text" name='OTP' id='OTP' value={credentials.OTP} onChange={onChange} placeholder="Enter OTP" />
                    </div>
                    <input type="submit" className="form-btn" value="Verify" />
                </form>
            </div>
        </>
    )
}
export default Home