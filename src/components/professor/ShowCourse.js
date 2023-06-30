import React, { useState, useEffect } from 'react';
import Loginauth from '../loginauth';
import ShowSem from './ShowSem';
import Nav from '../nav';

const ShowCourse = (props) => {
    const User = JSON.parse(sessionStorage.getItem('user'));
    const [isRendered, setIsRendered] = useState({ state: false, semName: '' });
    const [Mysemarray, setMysemarray] = useState([])
    const getCourses = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/fetchMyCourse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cid: User.cid }),
            });
            const json = await response.json();
            if (json.error) {
                alert(json.error);
            }
            return json;
        } catch (error) {
            console.log('Error fetching courses:', error);
        }
    };

    const showsemdetail = async (e) => {
        setIsRendered({ state: true, semName: e.target.id });
    };


    useEffect(() => {
        async function getCoursesAsync() {
            try {
                const json = await getCourses();
                setMysemarray(json)
            } catch (error) {
                console.error(error);
            }
        }
        getCoursesAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (Mysemarray && Mysemarray.error) {
        return (
            <>
                <h1>there are no semester created by admin yet</h1>
            </>
        )
    }
    let semList;

    semList = Mysemarray.map((item, index) => (
        <p key={index} onClick={showsemdetail} id={item.semName}>
            {item.semName}
        </p>
    ));
    return (
        <>
            <Loginauth type="teacher" />
            <Nav type="teacher" />
            {semList}
            {isRendered.state && <ShowSem sem={isRendered.semName} />}
        </>
    )
};

export default ShowCourse;
