import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Home = (props) => {
    const [credentials, setCredentials] = useState({ OTP: "" })
    let navigate = useNavigate();
    if (!sessionStorage.getItem('user')) {
        alert('Please login!');
        window.location.replace("http://localhost:3000");
    }
    const auth = async () => {
        if (sessionStorage.getItem('user')) {
            const User = await JSON.parse(sessionStorage.getItem("user"));
            if (User.type === "admin") {
                navigate("/home/adminDash")
            }
            else if (User.type === "student") {
                navigate("home/studentDash")
            }
            else if (User.type === "teacher") {
                navigate("/home/teacherDash")
            }
            else {
                navigate("/404", { replace: true })
            }
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const OTP = await JSON.parse(sessionStorage.getItem("OTP"));
        if (credentials.OTP === OTP) {
            alert("OTP Verified !!")
            auth();
        }
        else{
            alert("wrong OTP Entered !!")
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
                    <input type="number" className="form-text" name='OTP' id='OTP' value={credentials.OTP} onChange={onChange} placeholder="Enter OTP" />
                </div>
                <input type="submit" className="form-btn" value="Verify" />
            </form>
        </div>
    )
}
export default Home