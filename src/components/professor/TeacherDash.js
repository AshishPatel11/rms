import React from 'react'
import { Link } from "react-router-dom";
import Loginauth from '../loginauth'

function TeacherDash() {
    return (
        <>
            <Loginauth type="teacher" />
            <div className='card-container'>
                <div className='option-card'>
                    <p><Link to="myCourse">My Course</Link></p>
                    <p><Link to="joinCourse">Join Course</Link></p>
                </div>
            </div>
        </>
    )
}

export default TeacherDash