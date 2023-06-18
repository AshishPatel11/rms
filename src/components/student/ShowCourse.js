import React from 'react'
import Loginauth from '../loginauth.js'
function ShowCourse(props) {
    const User = JSON.parse(sessionStorage.getItem("user"));
    return (
        <>
            <Loginauth type="student" />
        </>
    )
}

export default ShowCourse