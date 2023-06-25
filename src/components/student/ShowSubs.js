import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Loginauth from '../loginauth'
function ShowSubs() {
    let { state } = useLocation();
    const [Myfolder, setMyfolder] = useState([])
    const getCourses = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/fetchFolder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subcode: state.subcode }),
            });
            const json = await response.json();
            return json;
        } catch (error) {
            console.log('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        async function getCoursesAsync() {
            try {
                const json = await getCourses();
                setMyfolder(json)
            } catch (error) {
                console.error(error);
            }
        }
        getCoursesAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    let folderList;
    console.log(Myfolder)
    if (Myfolder[0]) {
        folderList = Myfolder.map((item, index) => (
            <p key={index}>
                <Link to="folderData" state={item}>
                    {item.folderName}
                </Link>
            </p >
        ));
    }
    return (
        <>
            <Loginauth type="student" />
            {folderList}
        </>
    )
}

export default ShowSubs