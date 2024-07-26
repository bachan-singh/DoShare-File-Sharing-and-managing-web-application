import React from 'react';
import './Footer.css';
import { FaFacebookF } from "react-icons/fa";
import { RiTwitterLine } from "react-icons/ri";
import { SiInstagram } from "react-icons/si";
import { FaYoutube } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <div className='footer'>
            <div className="footer-info">
                <div className="content">
                    <div className="info">
                        <h1>DoShare</h1>
                        <p>we offer secure storage and sharing, ensuring all your data is protected from unauthorized access.
                            with our platform you feel sofe for youe important files and documents.
                        </p>
                    </div>
                    <ul className="social-links">
                        <li><FaFacebookF /></li>
                        <li><RiTwitterLine /></li>
                        <li><SiInstagram /></li>
                        <li><FaYoutube /></li>
                    </ul>
                </div>
                <div className="content">
                    <ul className="links">
                        <li>Privacy</li>
                        <li>Policy</li>
                    </ul>
                    <ul className="links">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/features">Features</NavLink></li>
                        <li><NavLink to="/process">How it Works</NavLink></li>
                        <li><NavLink to="/contact">Contact Us</NavLink></li>
                    </ul>
                </div>
            </div>

            <div className="footer-copyright"><hr />
                <p>CopyRight @ 2024 | All Rights Reserved | Bachan Singh</p>
            </div>
        </div>
    );
}

export default Footer;
