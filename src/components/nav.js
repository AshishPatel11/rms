import React from 'react'
import '../CSS/nav.css';
import { Link } from "react-router-dom";
function Nav(props) {
    if (props.type === "default") {
        return (
            <>
                <div className="navBar">
                    <h1 className="nav-title">Resource Management System</h1>
                </div>
            </>
        );
    }
    else if (props.type === "admin") {
        return (
            <>
                <div className="navBar">
                    <h1 className="nav-title"><Link to="/home/adminDash" className="nav-title">Resource Management System</Link></h1>
                    <div className='nav-list'>
            
                    </div>
                    <p><Link className="nav-link logout" to="/logout" replace="true">Logout</Link></p>
                </div>
            </>
        );
    }
    else if (props.type === "teacher") {
        return (
            <>
                <div className="navBar">
                    <h1 className="nav-title"><Link to="/home/teacherDash" className="nav-title">Resource Management System</Link></h1>
                    <p><Link className="nav-link logout" to="/logout" replace="true">Logout</Link></p>
                </div>
            </>
        );
    }
    else if (props.type === "student") {
        return (
            <>
                <div className="navBar">
                    <h1 className="nav-title"><Link to="/home/studentDash" className="nav-title">Resource Management System</Link></h1>
                    <p><Link className="nav-link logout" to="/logout" replace="true">Logout</Link></p>
                </div>
            </>
        );
    }

}
export default Nav;