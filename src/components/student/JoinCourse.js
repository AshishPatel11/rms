import React from 'react'
import Loginauth from '../loginauth'
function JoinCourse() {
    const handleSubmit = async (e) => {
        // e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/fetchCourse", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        });
        const json = await response.json()
        return json
    }
    const courselist = handleSubmit().then(a => console.log(a))
    // console.log(courselist)
    let courseNames = []
    for (let i = 0; i < courselist.length; i++) {
        courseNames.push(courselist.courseName.concat(" ", courselist.courseDura));
    }
    let itemList = courseNames.map((item, index) => {
        return <option key={index}>{item}</option>
    })
    return (
        <>
            <Loginauth type="student" />
            <div className="loginForm">
                <form className="form" method="post">
                    <div className="input-fields">
                        <select name="Course">
                            <option value="volvo">Volvo</option>
                        </select>
                    </div>
                    <input type="submit" className="form-btn" value="Verify" />
                </form>
            </div>
        </>
    )
}

export default JoinCourse