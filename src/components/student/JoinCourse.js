import React, { useState, useEffect } from 'react'
import Loginauth from '../loginauth'
function JoinCourse() {
    const [courses, setCourses] = useState([])
    const getCourses = async (e) => {
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
    useEffect(() => {
        async function getCoursesAsync() {
            try {
                const json = await getCourses();
                setCourses(json)
            } catch (error) {
                console.error(error);
            }
        }
        getCoursesAsync();
    }, [])
    let courseNames = []
    for (let i = 0; i < courses.length; i++) {
        courseNames.push(courses[i].cid);
    }
    const [credentials, setCredentials] = useState(courseNames[0])

    const onChange = event => {
        console.log(event.target.value);
        setCredentials(event.target.value);
    };
    let itemList = courseNames.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    })


    //sending the request for the approval
    const handleSubmit = async (e) => {
        e.preventDefault();

        const User = JSON.parse(sessionStorage.getItem("user"));
        const response = await fetch("http://localhost:5000/api/auth/joinreq", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: User.uid,
                cid: credentials,
                userName: User.userName
            })
        });
        console.log(credentials)
        const json = await response.json()
        if (json.cid) {
            alert("Request sent !!")
        }
        else if (json.error) {
            alert(json.error)
        }
        else if (json.errors) {
            alert(json.errors[0].msg);
        }
    }
    return (
        <>
            <Loginauth />
            <div className="loginForm" >
                <form className="form" method="post" onSubmit={handleSubmit}>
                    <div className="input-fields">
                        <select name="Course" onChange={onChange} value={credentials}>
                            <option hidden>select course</option>
                            {itemList}
                        </select>
                    </div>
                    <input type="submit" className="form-btn" value="Join" />
                </form>
            </div>
        </>
    )
}

export default JoinCourse