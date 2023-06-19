import React, { useState } from 'react'
import Loginauth from '../loginauth'
function JoinCourse() {
    const getAppr = async (e) => {
        // e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/fetchJoiReq", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        });
        const json = await response.json()
        if (json.msg) {
            alert(json.msg)
        }
        sessionStorage.setItem('approvals', JSON.stringify(json));
    }
    getAppr();
    const approvals = JSON.parse(sessionStorage.getItem("approvals"));
    let pendingAppr = []
    if (approvals) {
        for (let i = 0; i < approvals.length; i++) {
            pendingAppr.push(approvals[i]);
        }
    }
    const [credentials, setCredentials] = useState(pendingAppr)

    const onChange = (e) => {
        console.log(e.target)
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    //sending the request for the approval
    const handleSubmit = async (e) => {
        e.preventDefault();
        const buttonName = e.nativeEvent.submitter.name;
        if (buttonName === 'Approve') {
            // Handle approval submit
            const response = await fetch("http://localhost:5000/api/auth/approvedJoin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid: credentials[e.target.id].uid,
                    cid: credentials[e.target.id].cid,
                    userName: credentials[e.target.id].userName
                })
            });
            const json = await response.json()
            console.log(json)
            alert(json.msg)
        }

        else if (buttonName === 'Reject') {
            // Handle reject 2 submit
            const response = await fetch("http://localhost:5000/api/auth/RejectJoin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid: credentials[e.target.id].uid,
                    cid: credentials[e.target.id].cid,
                    userName: credentials[e.target.id].userName
                })
            });
            const json = await response.json()
            console.log(json)
            alert(json.msg)
        }
    }

    let formList = pendingAppr.map((item, index) => {
        return (<form key={index} method="post" id={index} onSubmit={handleSubmit}>
            <label htmlFor='uid'>User Id:-</label>
            <input type="number" name='uid' id={item.uid} value={item.uid} onChange={onChange} disabled required />

            <label htmlFor='userName'>User Name:-</label>
            <input type="text" name='userName' id={item.userName} value={item.userName} onChange={onChange} disabled required />


            <label htmlFor='courseName'>course Name:-</label>
            <input type="text" name='courseName' id={item.cid} value={item.cid} onChange={onChange} disabled required />


            <button type="submit" name='Approve'>Approve</button>
            <button type="submit" name='Reject'>Reject</button>
        </form>)
    })
    return (
        <>
            <Loginauth type="admin" />
            {formList}
        </>
    )
}

export default JoinCourse