import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Login from '../components/login.js'
import Home from '../components/home';
import AdminDash from '../components/admin/adminDash.js'
import StudentDash from '../components/student/StudentDash.js'
import AddUser from './admin/AddUser.js'
import AddCourse from '../components/admin/AddCourse.js'
function Routesdef(props) {
    return (
        <Router>
            <Routes>
                <Route index element={<Login />} />
                <Route path="home" element={<Home />} />
                <Route path="home/adminDash" element={<AdminDash />} />
                <Route path="home/studentDash" element={<StudentDash />} />
                <Route path="home/adminDash/addUser" element={<AddUser />} />
                <Route path="home/adminDash/AddCourse" Component={AddCourse} />
            </Routes>
        </Router>
    )
}

export default Routesdef