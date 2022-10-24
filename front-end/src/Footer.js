import React from 'react'
import "./Footer.css"
import scheduleLogo from "./schedule.png"
import searchLogo from "./search.png"
import profileLogo from "./profile.png"
import cartLogo from "./cart.png"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="Footer-footer">
      <Link to ="/profile">
        <img src={profileLogo} alt="profile" width="30" height="30" id="profile"/>
      </Link>
      <Link to="/coursesearch">
        <img src={searchLogo} alt="search" width="30" height="30" id="search"/>
      </Link>
      <Link to="/shoppingcart">
        <img src={cartLogo} alt="cart" width="30" height="30" id="cart"/>
      </Link>
      <Link to="/schedule">
        <img src={scheduleLogo} alt="schedule" width="30" height="30" id="schedule"/>
      </Link>
    </div>
  )
}

export default Footer
