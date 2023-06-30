import React from 'react'
import { Link } from "react-router-dom";
import Loginauth from '../loginauth.js'
import Nav from '../nav.js';
function MyCourse() {
    <Loginauth type="student" />
    const User = JSON.parse(sessionStorage.getItem("user"));
    if (User.cid) {
        return (
            <>
                <Loginauth type="student" />
                <Nav type="student" />
                <p><Link to="showCourse">{User.cid}</Link></p>
            </>
        )
    }
    else {
        return (
            <>
                <Loginauth type="student" />
                <h1>
                    <Nav type="student" />
                    You havn't Join any Courses
                </h1>
            </>
        )
    }
}

export default MyCourse