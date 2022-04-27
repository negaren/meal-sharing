import React from "react"
import './Navbar.css'

const Navbar = () => {
    return (
        <div className="navbar-container">
            <div className="navbar">
            <a href="http://localhost:3000/share-meal" className="navbar-links">Share meal</a>
            <a href="#" className="navbar-links">About</a>
            <a href="#" className="navbar-links">Gift cards</a>
        </div>
        </div>
    )
}

export default Navbar