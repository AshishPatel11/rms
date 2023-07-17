import React from 'react'
import { Link } from "react-router-dom";
import Loginauth from '../loginauth'
import Nav from '../nav';
import Lottie from 'lottie-react'
import animationData from '../CSS/animation_lk6f6l4g.json'
function StudentDash() {
    const User = JSON.parse(sessionStorage.getItem("user"));
    return (
        <>
            <Loginauth type="student" />
            <Nav type="student" />
            <div className='welcome'>
                <div>
                    <h1>welcome {User.userName}</h1>
                </div>
                <div className='welcome-lottie'>
                    <Lottie animationData={animationData}></Lottie>
                </div>
            </div>
            <div className='card-container vh100'>
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