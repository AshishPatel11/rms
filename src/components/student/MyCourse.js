import React from 'react'
import { Link } from "react-router-dom";
import Loginauth from '../loginauth.js'
import Nav from '../nav.js';
function MyCourse() {
    const User = JSON.parse(sessionStorage.getItem("user"));
    if (User.cid) {
        return (
            <>
                <Loginauth type="student" />
                <Nav type="student" />
                <div>
                    <Link to="showCourse" className='folder-card'><span className="material-symbols-outlined">
                        folder_special
                    </span><p>{User.cid}</p></Link>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <Loginauth type="student" />
                <Nav type="student" />
                <h1 className='title'>
                    You havn't Join any Courses
                </h1>
            </>
        )
    }
}

export default MyCourse