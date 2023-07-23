import React from 'react'
import { Link } from "react-router-dom";
import Loginauth from '../loginauth'
import Nav from '../nav';
import Lottie from 'lottie-react'
import { HashLink } from 'react-router-hash-link';
import animationData from '../CSS/animation_lk6f6l4g.json'
function StudentDash() {
    const User = JSON.parse(sessionStorage.getItem("user"));
    return (
        <>
            <Loginauth type="student" />
            <Nav type="student" />
            <div className='welcome'>
                <div className='welcome-text'>
                    <h1 className='Wel-title'>Welcome {User.userName}</h1>
                    <p className='cap'>Get all your material on one place</p>
                    <HashLink smooth to="#dash">
                        <button className='form-btn'>DashBoard</button>
                    </HashLink>
                </div>
                <div className='welcome-lottie'>
                    <Lottie animationData={animationData}></Lottie>
                </div>
            </div>
            <div className='card-container vh100' id="dash">
                <Link className='card' to="myCourse">
                    <span className="material-symbols-outlined">folder_special</span>
                    <p>My Course</p>
                </Link>
                <Link className='card' to="joinCourse">
                    <span className="material-symbols-outlined">
                        drive_file_move
                    </span>
                    <p>
                        Join Course
                    </p>
                </Link>
                <Link className='card' state={{ type: "student" }} to="updateProfile">
                    <span className="material-symbols-outlined">
                        account_box
                    </span>
                    <p>My Profile</p>
                </Link>
            </div>
        </>
    )
}

export default StudentDash