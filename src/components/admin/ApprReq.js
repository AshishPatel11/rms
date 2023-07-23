import React, { useState, useEffect } from 'react'
import Nav from '../nav'
import Loginauth from '../loginauth'
function JoinCourse() {
    const [approvals, setapprData] = useState([])

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
        return json;
    }
    useEffect(() => {
        async function getuserAsync() {
            try {
                const json = await getAppr();
                setapprData(json)
            } catch (error) {
                console.error(error);
            }
        }
        getuserAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
            // navigate("?");
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
            <table className='table-form'>
                <tbody>
                    <tr>
                        <td><input type="number" name='uid' id={item.uid} value={item.uid} onChange={onChange} disabled required /></td>

                        <td><input type="text" name='userName' id={item.userName} value={item.userName} onChange={onChange} disabled required /></td>

                        <td><input type="text" name='courseName' id={item.cid} value={item.cid} onChange={onChange} disabled required /></td>


                        <td><button type="submit" className='approve' name='Approve'>Approve</button></td>
                        <td><button type="submit" className='reject' name='Reject'>Reject</button></td>
                    </tr>
                </tbody>
            </table>
        </form >)
    })
    return (
        <>
            <Nav type="admin" />
            <Loginauth type="admin" />
            <div className='table-container'>
                <table className='table-form'>
                    <thead>
                        <tr>
                            <th><input type="text" disabled value="User Id" /></th>
                            <th><input type="text" disabled value="User Name" /></th>
                            <th><input type="text" disabled value="E-mail" /></th>
                        </tr>
                    </thead>
                </table>
                <div className='formlist'>
                    {formList}
                </div>
            </div>
        </>
    )
}

export default JoinCourse