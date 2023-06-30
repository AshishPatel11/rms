import React, { useState, useEffect, useCallback } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Loginauth from '../loginauth'
import Nav from '../nav'
function FolderData() {
    let { state } = useLocation()
    const [files, setFiles] = useState([])
    const [refresh, setRefresh] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', e.target.file.files[0]);
        const response = await fetch("http://localhost:5000/upload", {
            method: 'POST',
            body: formData
        });
        const json = await response.json()
        // console.log(json)
        if (json.id) {
            const response2 = await fetch("http://localhost:5000/api/auth/filedata",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fileid: json.id,
                        fileName: json.filename,
                        subcode: state.subcode,
                        fid: state.fid
                    })
                });
            const filedata = await response2.json();
            if (filedata.fileid) {
                alert("file uploaded successfully")
            }
        }
        setRefresh(prevRefresh => !prevRefresh);
    };



    //files list fetching
    const getfiles = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/fetchfiledata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subcode: state.subcode, fid: state.fid }),
            });
            const json = await response.json();
            if (json.error) {
                alert(json.error);
            }
            return json;
        } catch (error) {
            console.log('Error fetching files:', error);
        }
    }, [state])
    useEffect(() => {
        async function getCoursesAsync() {
            try {
                const json = await getfiles();
                setFiles(json)
            } catch (error) {
                console.error(error);
            }
        }
        getCoursesAsync();
    }, [getfiles]);



    let folderList;
    // console.log(files)
    if (files[0]) {
        folderList = files.map((item, index) => (
            <p key={index}>
                <Link to="download" state={item}>
                    {item.fileName}
                </Link>
            </p >
        ));
    }
    return (
        <>
            <Loginauth type="teacher" />
            <Nav type="teacher" />
            <h2>Create Course</h2>
            <form method="post" onSubmit={handleSubmit}>
                <label htmlFor='file'>Choose File:-</label>
                <input type="file" name='file' id='file' required />
                <input type='submit' name='submit' />
            </form>
            <div>{folderList}</div>

        </>
    )
}

export default FolderData