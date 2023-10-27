import React from "react"
import '../styles/Navbar.css'
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-list">
                <Link
                    className="navbar-list--item search-btn"
                    to={'/'}>
                    Search
                </Link>
                <Link
                    className="navbar-list--item"
                    to={'/favorites'}>
                    Favorites
                </Link>
            </div>
        </div>
    )
}

export default Navbar;