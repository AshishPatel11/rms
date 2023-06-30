import React, { useState, useEffect } from 'react'
import Nav from '../nav'
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
                semName: "sem".concat(" ", credentials.semName),
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
            <Nav type="admin" />

            <h2 className='title'>Create Subjects Folder</h2>
            <div className="loginForm">
                <form className='form' method="post" onSubmit={handleSubmit}>

                    <div className='form-fields'>
                        <label htmlFor='courseName'>Course Name:-</label>
                        <select className="form-text" name="cid" id="courseName" onChange={onChange} value={credentials.cid}>
                            <option hidden>select course</option>
                            {courseList}
                        </select>
                    </div>
                    <div className='form-fields'>
                        <label htmlFor='sem'>Semester Name:-</label>
                        <select className="form-text" name="semName" id="sem" onChange={onChange} value={credentials.semName}>
                            <option hidden>select sem</option>
                            {semList}
                        </select>
                    </div>
                    <div className='form-fields'>
                        <label htmlFor='subcode'>Subjects Code:-</label>
                        <input className="form-text" type="text" name='subcode' id='subcode' value={credentials.subcode} onChange={onChange} required placeholder='subject code' />
                    </div>
                    <div className='form-fields'>
                        <label htmlFor='subName'>Subjects Name:-</label>
                        <input className="form-text" type="text" name='subName' id='subName' value={credentials.subName} onChange={onChange} required placeholder='Name of subject' />
                    </div>
                    <input type='submit' className='form-btn' name='submit' value="create" />
                </form>
            </div>
        </>
    )
}

export default AddSub