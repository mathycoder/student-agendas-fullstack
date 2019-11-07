import React from 'react'
import { NavLink } from 'react-router-dom';
import './navbar.css'

const NavBar = () => {
  return (
    <div className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/progressions/new">New Progression</NavLink>
    </div>
  )
}

export default NavBar
