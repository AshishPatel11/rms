import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Loginauth from '../loginauth';
import Nav from '../nav';
function DelUSer() {
    let userlists = []
    let { state } = useLocation();
    const [UserData, setUserData] = useState([])
    const [credentials, setCredentials] = useState(userlists)


    const getuser = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/fetchuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });
            const json = await response.json();
            return json;
        } catch (error) {
            console.log('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        async function getuserAsync() {
            try {
                const json = await getuser();
                setUserData(json)
            } catch (error) {
                console.error(error);
            }
        }
        getuserAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    let folderList;
    console.log(UserData)
    if (UserData.error) {
        return (
            <>
                <Loginauth type="admin" />
                <Nav type="admin" />
                <h1 className='title'>Users not found</h1>
            </>
        )
    }
    //handle submit event
    const handleSubmit = async (e) => {
        e.preventDefault();
        setCredentials(userlists)
        const response = await fetch("http://localhost:5000/api/auth/deluser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: credentials[e.target.id].uid,
            })
        });
        const json = await response.json()
        if (json.msg) {
            alert("deletion success")
        }
        else if (json.error) {
            alert(json.error)
        }
        else if (json.errors) {
            alert(json.errors[0].msg);
        }
    }
    if (UserData) {
        for (let i = 0; i < UserData.length; i++) {
            userlists.push(UserData[i]);
        }
    }
    // setCredentials(userlists)
    const onChange = (e) => {
        console.log(e.target)
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }



    if (UserData[0]) {
        folderList = UserData.map((item, index) => (
            <form key={index} method="post" className='deleteform' id={index} onSubmit={handleSubmit}>
                <label className='white' htmlFor='uid'>User Id:-</label>
                <input type="number" name='uid' id={item.uid} value={item.uid} onChange={onChange} disabled required />

                <label className='white' htmlFor='userName'>User Name:-</label>
                <input type="text" name='userName' id={item.userName} value={item.userName} onChange={onChange} disabled required />


                <label className='white' htmlFor='email'>Email:-</label>
                <input type="text" name='email' id={item.email} value={item.email} onChange={onChange} disabled required />


                <label className='white' htmlFor='type'>User Role:-</label>
                <input type="text" name='type' id={item.type} value={item.type} onChange={onChange} disabled required />


                <button type="submit" className='reject' name='delete'>Delete</button>
            </form>
        ));
    }
    return (
        <>
            <Nav type="admin"/>
            {folderList}
        </>
    )
}

export default DelUSer