import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function Logout() {
    let navigate = useNavigate()
    useEffect(() => {
        sessionStorage.clear();
        localStorage.clear()
        alert("Logged Out!!")
        navigate('/')
    })
}

export default Logout