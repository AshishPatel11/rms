import { useNavigate } from 'react-router-dom'
// import React from 'react'
const Home = (props) => {
    let navigate = useNavigate();
    const auth = async () => {
        if (sessionStorage.getItem('user')) {
            const User = await JSON.parse(sessionStorage.getItem("user"));
            if (User.type === "admin") {
                navigate("/home/adminDash")
            }
            else if (User.type === "student") {
                navigate("home/studentDash")
            }
            else if (User.type === "teacher") {
                navigate("/home/teacherDash")
            }
            else {
                navigate("/404", { replace: true })
            }
        }
        else {
            alert('Please login!');
            window.location.replace("http://localhost:3000");
        }
    }
    auth();
}
export default Home