import React from 'react'
import Nav from '../nav'
import '../CSS/adminDash.css';
import { Link } from "react-router-dom";
import Loginauth from '../loginauth'
function adminDash() {
    return (
        <>
            <Loginauth type="admin" />
            <Nav type="admin" />
            <div className='card-container'>
                <Link className='card' to="addUser">
                    <span className="material-symbols-outlined">person_add</span>
                    <p>Add User</p>
                </Link>


                <Link className='card' to="AddCourse">
                    <span className="material-symbols-outlined">assignment_add</span>
                    <p>Add Course</p>
                </Link>


                <Link className='card' to="AddSem">
                    <span className="material-symbols-outlined">post_add</span>
                    <p>Create Semester</p>
                </Link>
            </div>


            <div className='card-container'>
                <Link className='card' to="AddSub">
                    <span className="material-symbols-outlined">create_new_folder</span>
                    <p>Create Subjects</p>
                </Link>


                <Link className='card' to="apprReq">
                    <span className="material-symbols-outlined">check_circle</span>
                    <p>Pending Approvals</p>
                </Link>
                <Link className='card' to="apprReq">
                    <span className="material-symbols-outlined">edit_note</span>
                    <p>Update Course</p>
                </Link>
            </div >
        </>
    )
}

export default adminDash
