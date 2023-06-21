import React, { useState, useEffect } from 'react'
import Loginauth from '../loginauth'
function AddSub() {
    var course = {
        cid: "",
        semName: "",
        subName: "",
        subcode: ""
    };
    const [credentials, setCredentials] = useState(course)

    const [courses, setCourses] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/addSub", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                semid: credentials.cid.concat(" sem ", credentials.semName),
                cid: credentials.cid,
                subcode: credentials.subcode,
                subName: credentials.subName,
            })
        });
        const json = await response.json()
        if (json.subcode) {
            alert("subject created")
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
        // e.preventDefault();
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
        return json
    }


    useEffect(() => {
        async function getCoursesAsync() {
            try {
                const json = await getCourses();
                setCourses(json)
                console.log(json)
            } catch (error) {
                console.error(error);
            }
        }
        getCoursesAsync();
    }, [])
    if (courses.error) {
        return (
            <>
                <h1>There are No Semester or Courses Created</h1>
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
            <h2>Create Subjects</h2>
            <form method="post" onSubmit={handleSubmit}>
                <label htmlFor='courseName'>Course Name:-</label>
                <select name="cid" id="courseName" onChange={onChange} value={credentials.cid}>
                    <option hidden>select course</option>
                    {courseList}
                </select>

                <label htmlFor='sem'>Semester Name:-</label>
                <select name="semName" id="sem" onChange={onChange} value={credentials.semName}>
                    <option hidden>select sem</option>
                    {semList}
                </select>


                <label htmlFor='subcode'>Subjects Code:-</label>
                <input type="text" name='subcode' id='subcode' value={credentials.subcode} onChange={onChange} required placeholder='subject code' />


                <label htmlFor='subName'>Subjects Name:-</label>
                <input type="text" name='subName' id='subName' value={credentials.subName} onChange={onChange} required placeholder='Name of subject' />

                <input type='submit' name='submit' value="create" />
            </form>
        </>
    )
}

export default AddSub