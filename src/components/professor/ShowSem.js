import React, { useState, useEffect, useCallback } from 'react'
import { Link } from "react-router-dom";
import Nav from '../nav';
import Loginauth from '../loginauth';


function ShowSem(props) {
    const [Subjects, setSubjects] = useState([])
    const getSub = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/fetchSub', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ semName: props.sem }),
            });
            const json = await response.json();
            if (json.error) {
                alert(json.error);
            }
            return json;
        } catch (error) {
            console.log('Error fetching courses:', error);
        }
    }, [props.sem])
    useEffect(() => {
        async function getCoursesAsync() {
            try {
                const json = await getSub();
                setSubjects(json)
            } catch (error) {
                console.error(error);
            }
        }
        getCoursesAsync();
    }, [getSub]);
    if (Subjects && Subjects.error) {
        return (
            <>
                <Nav type="teacher" />
                <h1>there are no subjects created by admin yet</h1>
            </>
        )
    }
    let subList;

    subList = Subjects.map((item, index) => (
        <p key={index}>
            <Link to="subjects" state={{ subName: item.subName, subcode: item.subcode }}>{item.subName}</Link>
        </p>
    ));
    return (
        <>
            <Loginauth type="teacher" />
            <Nav type="teacher" />
            <h1>{props.sem}</h1>
            {subList}
        </>
    )
}
export default ShowSem