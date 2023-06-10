import React from 'react'
import { Link } from "react-router-dom";
function adminDash() {
    return (
        <>
            <div className='card-container'>
                <div className='option-card'>
                    <p><Link to="addUser">Add User</Link></p>
                </div>
            </div>
        </>
    )
}

export default adminDash