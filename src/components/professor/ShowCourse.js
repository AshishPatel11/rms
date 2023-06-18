import React, { useState, useEffect } from 'react';
import Loginauth from '../loginauth.js'
import ShowSem from './ShowSem.js'
function ShowCourse(props) {
    const User = JSON.parse(sessionStorage.getItem("user"));
    const getCourses = async (e) => {
        // e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/fetchMyCourse", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cid: User.cid })
        });
        const json = await response.json()
        sessionStorage.setItem('Mycourses', JSON.stringify(json));
    }
    async function myAsyncFunction() {
        await getCourses();
    }
    myAsyncFunction();
    const Mysemarray = JSON.parse(sessionStorage.getItem("Mycourses"))
    const [isRendered, setIsRendered] = useState({ state: false, semName: "" });
    let showsemdetail = async (e) => {
        setIsRendered({ state: true, semName: e.target.id });
    }
    useEffect(() => {
        console.log(isRendered);
    }, [isRendered]);
    let semList = Mysemarray.map((item, index) => {
        return <p key={index} onClick={showsemdetail} id={item.semName}>{item.semName}</p>
    })
    return (
        <>
            <Loginauth type="teacher" />
            {semList}
            {isRendered.state && <ShowSem sem={isRendered.semName} />}
        </>
    )
}

export default ShowCourse