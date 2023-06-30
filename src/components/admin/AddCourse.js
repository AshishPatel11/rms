import React, { useState } from 'react'
import Loginauth from '../loginauth'
import Nav from '../nav'
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
            <Nav type="admin" />
            <h2 className='title'>Create Course</h2>
            <div className="loginForm">
                <form className="form" method="post" onSubmit={handleSubmit}>
                    <div className='form-fields'>
                        <label htmlFor='courseName'>Course Name:-</label>
                        <input className="form-text" type="text" name='courseName' id='courseName' value={credentials.courseName} onChange={onChange} required placeholder='Name of Course' />
                    </div>
                    <div className='form-fields'>
                        <label htmlFor='courseDura'>Course Year:-</label>
                        <input className="form-text" type="text" name='courseDura' id='courseDura' value={credentials.courseDura} onChange={onChange} required placeholder='Year duration of Course' />
                    </div>

                    <div className='form-fields'>
                        <label htmlFor='sem'>Total Semester:-</label>
                        <input className="form-text" type="number" name='sem' id='sem' value={credentials.sem} onChange={onChange} required placeholder='No. of semester' />
                    </div>
                    <input className="form-btn" type='submit' name='submit' />
                </form>
            </div>
        </>
    )
}
export default AddCourse