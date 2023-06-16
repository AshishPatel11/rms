import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Login from '../components/login.js'
import Home from '../components/home';
import AdminDash from '../components/admin/AdminDash.js'
import StudentDash from '../components/student/StudentDash.js'
import AddUser from '../components/admin/AddUser.js'
import AddCourse from '../components/admin/AddCourse.js'
import MyCourse from '../components/student/MyCourse.js'
import JoinCourse from '../components/student/JoinCourse.js'
import P404 from './P404.js'
function Routesdef(props) {
    return (
        <Router>
            <Routes>
                <Route index element={<Login />} />
                <Route path="home" element={<Home />} />
                <Route path="home/adminDash" element={<AdminDash />} />
                <Route path="home/adminDash/addUser" element={<AddUser />} />
                <Route path="home/adminDash/AddCourse" Component={AddCourse} />
                <Route path="home/studentDash" element={<StudentDash />} />
                <Route path="home/studentDash/myCourse" element={<MyCourse />} />
                <Route path="home/studentDash/joinCourse" element={<JoinCourse />} />
                <Route path="/404" element={<P404 />} />
            </Routes>
        </Router>
    )
}

export default Routesdef