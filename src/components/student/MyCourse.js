import React from 'react'
import { Link } from "react-router-dom";
import Loginauth from '../loginauth.js'
function MyCourse() {
    <Loginauth type="student" />
    const User = JSON.parse(sessionStorage.getItem("user"));
    if (User.cid) {
        return (
            <>
                <p><Link to="showCourse ">{User.cid}</Link></p>
            </>
        )
    }
    else {
        return (
            <>
                <h1>
                    You havn't Join any Courses
                </h1>
            </>
        )
    }
}

export default MyCourse