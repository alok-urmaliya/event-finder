import React from "react"
import '../styles/Navbar.css'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-list">
                <a className="navbar-list--item search-btn">
                    Search
                </a>
                <a className="navbar-list--item">
                    Favorites                    
                </a>
            </div>
        </div>
    )
}

export default Navbar;