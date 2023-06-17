import React, { useState } from 'react'
import Loginauth from '../loginauth'
function AddCourse() {
    var course = {
        courseName: "",
        courseDura: "",
        sem: ""
    };
    const [credentials, setCredentials] = useState(course)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/addcourse", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cid: credentials.courseName.concat(" ", credentials.courseDura),
                courseName: credentials.courseName,
                courseDura: credentials.courseDura,
                sem: credentials.sem
            })
        });
        const json = await response.json()
        if (json.courseName) {
            alert("registration success")
        }
        else if (json.error) {
            alert(json.error)
        }
        else if (json.errors) {
            alert(json.errors[0].msg);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <Loginauth type="admin" />
            <h2>Create Course</h2>
            <form method="post" onSubmit={handleSubmit}>
                <label htmlFor='courseName'>Course Name:-</label>
                <input type="text" name='courseName' id='courseName' value={credentials.courseName} onChange={onChange} required placeholder='Name of Course' />


                <label htmlFor='courseDura'>Course Year:-</label>
                <input type="text" name='courseDura' id='courseDura' value={credentials.courseDura} onChange={onChange} required placeholder='Year duration of Course' />


                <label htmlFor='sem'>Total Semester:-</label>
                <input type="number" name='sem' id='sem' value={credentials.sem} onChange={onChange} required placeholder='No. of semester' />

                <input type='submit' name='submit' />
            </form>
        </>
    )
}
export default AddCourse