import React from 'react'
import { Link } from "react-router-dom";
import Loginauth from '../loginauth.js'
import Nav from '../nav.js';
function MyCourse() {
    const User = JSON.parse(sessionStorage.getItem("user"));
    if (User.cid) {
        return (
            <>
                <Loginauth type="teacher" />
                <Nav type="teacher" />
                <p><Link to="showCourse">{User.cid}</Link></p>
            </>
        )
    }
    else {
        return (
            <>
                <Loginauth type="teacher" />
                <Nav type="teacher" />
                <h1>
                    You havn't Join any Courses
                </h1>
            </>
        )
    }
}

export default MyCourse