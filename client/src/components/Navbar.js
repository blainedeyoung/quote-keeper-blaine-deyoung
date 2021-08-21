import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
    const { logout } = props
    return (
        <div className="navbar">
            <Link to="/quotes">Quotes Page</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/addQuote">Add Quote</Link>
            <button className="formButtons" onClick={logout}>Logout</button>
        </div>
    )
}

export default Navbar