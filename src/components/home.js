// import React from 'react'

function home() {
    if (sessionStorage.getItem('user')){
        const User = JSON.parse(sessionStorage.getItem("user"));
        console.log(User)
    }
    else {
        alert('Please login!');
        window.location.replace("http://localhost:3000");
    }
}

export default home