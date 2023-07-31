import React, { useState, useEffect } from 'react'
import Nav from '../nav'
import Loginauth from '../loginauth'
function Mngcourse() {
    var course = {
        cid: "",
        semName: "",
        sub: ""
    };
    const [courses, setCourses] = useState([])
    const [credentials, setCredentials] = useState(course)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/addSem", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                semid: credentials.cid.concat(" sem ", credentials.semName),
                cid: credentials.cid,
                semName: "sem ".concat(credentials.semName),
                subCount: credentials.sub,
                semno: credentials.semName
            })
        });
        const json = await response.json()
        if (json.semName) {
            alert("semester created")
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


    //fetching the courses
    const getCourses = async (e) => {
        const response = await fetch("http://localhost:5000/api/auth/fetchCourse", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        });
        const json = await response.json()
        if (json.error) {
            alert(json.error)
        }
        return json;
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
    if (courses.error) {
        return (
            <>
                <h1>No Semester</h1>
            </>
        )
    }
    let courseNames = []
    for (let i = 0; i < courses.length; i++) {
        courseNames.push(courses[i].cid);
    }
    let courseList = courseNames.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    })

    let selectedObj = courses.find(obj => {
        return obj.cid === credentials.cid
    })
    let loopend;
    if (selectedObj) {
        loopend = JSON.parse(selectedObj.sem)
    }
    let semlistarr = []
    for (let i = 1; i <= loopend; i++) {
        semlistarr.push(i);
    }
    let semList = semlistarr.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    })
    return (
        <>
            <Loginauth type="admin" />
            <Nav type="admin" />
            <h2 className='title'>Create Semester</h2>
            <div className="loginForm">
                <form method="post" className='form' onSubmit={handleSubmit}>
                    <div className='form-fields'>
                        <label htmlFor='courseName'>Course List:-</label>
                        <select className="form-text" name="cid" id="courseName" onChange={onChange} value={credentials.cid}>
                            <option hidden>select course</option>
                            {courseList}
                        </select>
                    </div>
                    <div className='form-fields'>
                        <label htmlFor='courseName'>New Course Name:-</label>
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
                    <input type='submit' className='form-btn' name='submit' value="create" />
                </form>
            </div>
        </>
    )
}

export default Mngcourse