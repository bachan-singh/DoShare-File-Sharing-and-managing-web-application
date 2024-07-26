import React from 'react'
import { NavLink } from 'react-router-dom'
import heroImg from '../photos/hero_img.gif'
import './Hero.css'

const Hero = () => {
  return (
    <div className="hero">
      
      <div className="hero-content">
        <h1>Keep your files organised and share them with comfort.</h1>
        <p>we offer secure storage and sharing, ensuring all your data is protected from unauthorized access.</p>
        <NavLink to="/login" className="secondarBtn">Get Started</NavLink>

      </div>
      <div className="hero-img">
        <img src={heroImg} alt="Hero Img" />
      </div>
    </div>
  )
}

export default Hero