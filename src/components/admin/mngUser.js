import React from 'react'
import Nav from '../nav'
import '../CSS/adminDash.css';
import { Link } from "react-router-dom";
import Loginauth from '../loginauth'
function mngUser() {
    return (
        <>
            <Loginauth type="admin" />
            <Nav type="admin" />
            <div className='card-container'>
                <Link className='card' to="AddUser">
                    <span className="material-symbols-outlined">person_add</span>
                    <p>Add User</p>
                </Link>


                <Link className='card' to="delUSer">
                    <span className="material-symbols-outlined">account_circle_off</span>
                    <p>Delete User</p>
                </Link>
            </div>
        </>
    )
}

export default mngUser