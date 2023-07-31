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
import AddSem from '../components/admin/AddSem.js'
import AddSub from '../components/admin/AddSub.js'
import AddUser from '../components/admin/AddUser.js'
import AddCourse from '../components/admin/AddCourse.js'
import MyCourse from '../components/student/MyCourse.js'
import JoinCourse from '../components/student/JoinCourse.js'
import MyCourseTe from '../components/professor/MyCourse.js'
import JoinCourseTe from '../components/professor/JoinCourse.js'
import ApprReq from '../components/admin/ApprReq.js'
import MngCourse from '../components/admin/MngCourse.js'
import ShowCourse from '../components/student/ShowCourse.js'
import ShowCoursePro from '../components/professor/ShowCourse.js'
import TeacherDash from '../components/professor/TeacherDash.js'
import ShowSubs from '../components/professor/ShowSubs.js'
import DownloadFile from '../components/professor/DownloadFile.js'
import P404 from './P404.js'
import AddFolder from './professor/AddFolder.js';
import FolderData from './professor/FolderData.js';
import ShowSubsSt from '../components/student/ShowSubs.js'
import FolderDataSt from '../components/student/FolderData.js'
import Logout from './Logout.js'
import DownloadFileSt from './student/DownloadFile.js'
import UpdateProfile from './updateProfile.js'
import MngUser from '../components/admin/mngUser.js'
import DelUSer from './admin/DelUSer.js';
// import Nav from './nav.js'
function Routesdef(props) {
    return (
        <Router>
            {/* <Nav /> */}
            <Routes>
                <Route index element={<Login />} />
                <Route path="home" element={<Home />} />
                <Route path="home/adminDash" element={<AdminDash />} />
                <Route path="home/adminDash/updateProfile" element={<UpdateProfile />} />
                <Route path="home/adminDash/mngUser/addUser" element={<AddUser />} />
                <Route path="home/adminDash/mngUser/delUser" element={<DelUSer />} />
                <Route path="home/adminDash/mngUser" element={<MngUser />} />
                <Route path="home/adminDash/apprReq" element={<ApprReq />} />
                <Route path="home/adminDash/mngcourse" element={<MngCourse />} />
                <Route path="home/adminDash/AddCourse" Component={AddCourse} />
                <Route path="home/adminDash/AddSem" Component={AddSem} />
                <Route path="home/adminDash/AddSub" Component={AddSub} />
                <Route path="home/studentDash" element={<StudentDash />} />
                <Route path="home/studentDash/updateProfile" element={<UpdateProfile />} />
                <Route path="home/studentDash/myCourse" element={<MyCourse />} />
                <Route path="home/studentDash/joinCourse" element={<JoinCourse />} />
                <Route path="home/studentDash/myCourse/showCourse" element={<ShowCourse />} />
                <Route path="home/studentDash/myCourse/showCourse/subjects" element={<ShowSubsSt />} />
                <Route path="home/studentDash/myCourse/showCourse/subjects/folderData" element={<FolderDataSt />} />
                <Route path="home/studentDash/myCourse/showCourse/subjects/folderData/download" element={<DownloadFileSt />} />
                <Route path="home/teacherDash/myCourse/showCourse" element={<ShowCoursePro />} />
                <Route path="home/teacherDash/myCourse/showCourse/subjects" element={<ShowSubs />} />
                <Route path="home/teacherDash/myCourse/showCourse/subjects/folderData" element={<FolderData />} />
                <Route path="home/teacherDash/myCourse/showCourse/subjects/folderData/download" element={<DownloadFile />} />
                <Route path="home/teacherDash/myCourse/showCourse/subjects/AddFolder" element={<AddFolder />} />
                <Route path="home/teacherDash/updateProfile" element={<UpdateProfile />} />
                <Route path="home/teacherDash" element={<TeacherDash />} />
                <Route path="home/teacherDash/myCourse" element={<MyCourseTe />} />
                <Route path="home/teacherDash/joinCourse" element={<JoinCourseTe />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/404" element={<P404 />} />
            </Routes>
        </Router>
    )
}

export default Routesdef