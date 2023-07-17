import React, { useState, useEffect, useCallback } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Nav from '../nav'
import Loginauth from '../loginauth'
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
        console.log(json)
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
    }, [state.fid, state.subcode])
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
    console.log(files)
    if (files[0]) {
        folderList = files.map((item, index) => (
            <Link className='file-node' key={index} to="download" state={item}>
                <span className="material-symbols-outlined file-icon">
                    news
                </span>
                <p>{item.fileName}</p>
            </Link>

        ));
    }
    return (
        <>
            <Loginauth type="student" />
            <Nav type="student" />
            <h1 className='title'>Files in {state.fid.split("-")[0]}</h1>
            <div className='filelist'>{folderList}</div>

        </>
    )
}

export default FolderData