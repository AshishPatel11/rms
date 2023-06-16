import React from 'react'
import { Link } from "react-router-dom";
import Loginauth from '../loginauth'

function StudentDash() {
    return (
        <>
            <>
                <Loginauth type="student"/>
                <div className='card-container'>
                    <div className='option-card'>
                        <p><Link to="myCourse">My User</Link></p>
                        <p><Link to="joinCourse">Join Course</Link></p>
                    </div>
                </div>
            </>
        </>
    )
}

export default StudentDash