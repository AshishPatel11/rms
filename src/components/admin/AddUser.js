import React, { useState } from 'react'
import Nav from '../nav'
import "../CSS/adminDash.css"
import Loginauth from '../loginauth'
const AddUser = (props) => {
    var user = {
        uid: "",
        userName: "",
        email: "",
        password: "",
        type: ""
    };
    const [credentials, setCredentials] = useState(user)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/adduser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: credentials.uid,
                userName: credentials.userName,
                email: credentials.email,
                type: credentials.type
            })
        });
        const json = await response.json()
        if (json.userName) {
            alert("registration success")
        }
        else if (json.error) {
            alert(json.error)
        }
        else if (json.errors) {
            alert(json.errors[0].msg);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <Loginauth />
            <Nav type="admin" />

            <div className="loginForm adduser">
                <form className="form" method="post" onSubmit={handleSubmit}>
                    <div className="form-fields reg">
                        <label htmlFor='uid' >User ID:-</label>
                        <input type="text" className="form-text" name='uid' value={credentials.uid} id='uid' onChange={onChange} required placeholder="Enter uid" />
                    </div>
                    <div className="form-fields reg">
                        <label htmlFor='userName' >User Name:-</label>
                        <input type="text" className="form-text" name='userName' value={credentials.userName} id='userName' onChange={onChange} required placeholder="Enter Username" />
                    </div>
                    <div className="form-fields reg">
                        <label htmlFor='email' >Email ID:-</label>
                        <input type="text" className="form-text" name='email' value={credentials.email} id='email' onChange={onChange} required placeholder="Enter email" />
                    </div>
                    {/* <div className="form-fields reg">
                        <label htmlFor='type' >User Role:-</label>
                        <input type="text" className="form-text" name='type' value={credentials.type} id='type' onChange={onChange} required placeholder="Enter user type" />
                    </div> */}


                    <div className='form-fields reg'>
                        <label htmlFor='type' >User Role:-</label>
                        <select className="form-text" name="type" id="type" required onChange={onChange} value={credentials.type}>
                            <option hidden>select Role</option>
                            {/* {semList} */}
                            <option value="admin">admin</option>
                            <option value="teacher">teacher</option>
                            <option value="student">student</option>
                        </select>
                    </div>

                    <input type="submit" className="form-btn" value="Create" />
                </form>
            </div>
        </>
    )
}

export default AddUser
