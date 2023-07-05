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
            if (filedata.error) {
                alert(filedata.error)
            }
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
            <Loginauth type="teacher" />
            <Nav type="teacher" />
            <h1 className='title'>Upload Files</h1>
            <form method="post" onSubmit={handleSubmit}>
                <div className='form-fields'>
                    <label htmlFor='file'>Choose File:-</label>
                    <input type="file" name='file' id='file' required />
                    <input type='submit' className='form-btn' name='submit' value="Upload"/>
                </div>
            </form>
            <h1 className='title'>Uploaded Files {state.fid}</h1>
            <div className='filelist'>{folderList}</div>

        </>
    )
}

export default FolderData