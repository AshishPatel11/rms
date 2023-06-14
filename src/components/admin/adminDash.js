import React from 'react'
import { Link } from "react-router-dom";
import Loginauth from '../loginauth'
function adminDash() {
    return (
        <>
            <Loginauth />
            <div className='card-container'>
                <div className='option-card'>
                    <p><Link to="addUser">Add User</Link></p>
                    <p><Link to="AddCourse">Add Course</Link></p>
                </div>
            </div>
        </>
    )
}

export default adminDash