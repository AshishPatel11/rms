import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Loginauth from '../loginauth'
import Nav from '../nav';
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
    if (Myfolder.error) {
        return (
            <>
                <Loginauth type="student" />
                <Nav type="student" />
                <h1 className='title'>Folders are not created yet</h1>
            </>
        )
    }
    if (Myfolder[0]) {
        folderList = Myfolder.map((item, index) => (
            <Link key={index} className='folder-card' to="folderData" state={item}>
                <span className="material-symbols-outlined" id={item.semName}>
                    folder
                </span>
                <p>
                    {item.folderName}
                </p>
            </Link>
        ));
    }
    return (
        <>
            <Loginauth type="student" />
            <Nav type="student" />
            <h1 className='title'>Folders</h1>
            <div className='subCard-container'>
                {folderList}
            </div>
        </>
    )
}

export default ShowSubs