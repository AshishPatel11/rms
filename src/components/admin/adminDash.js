import React from 'react'
import { Link } from "react-router-dom";
import Loginauth from '../loginauth'
function adminDash() {
    return (
        <>
            <Loginauth type="admin" />
            <div className='card-container'>
                <div className='option-card'>
                    <p><Link to="addUser">Add User</Link></p>
                    <p><Link to="AddCourse">Add Course</Link></p>
                    <p><Link to="AddSem">Create Semester</Link></p>
                    <p><Link to="apprReq">Pending approvals</Link></p>
                </div>
            </div>
        </>
    )
}

export default adminDash