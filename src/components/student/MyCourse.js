import React from 'react'
import ShowCourse from '../student/ShowCourse'
import { Link } from "react-router-dom";
import Loginauth from '../loginauth'
function MyCourse() {
    <Loginauth type="student" />
    const User = JSON.parse(sessionStorage.getItem("user"));
    if (User.cid) {
        return (
            <>
                <ShowCourse cName={User.cid} />
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