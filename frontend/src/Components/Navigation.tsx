import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';
import { MdOutlineMenu } from "react-icons/md";
interface NavigationProps { }

const Navigation: React.FC<NavigationProps> = () => {
    const [showLinks, setShowLinks] = useState<boolean>(false);

    const user = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login")
    }
    let userData: any = {};

    if (user) {
        try {
            userData = JSON.parse(user);
        } catch (error) {
            localStorage.removeItem('user');
            userData = {};
        }
    }

    const isPublicUser = userData.role === 'user';
    const isAdmin = userData.role === 'admin';

    const userLogin = Object.keys(userData).length > 0 && isPublicUser;
    const admin = Object.keys(userData).length > 0 && isAdmin;

    return (
        <nav className='navigation'>
            <h1 className="logo">DoShare</h1>
            <div className="links">
                <ul id={showLinks ? "hidden" : ""}>
                    {!user && (
                        <>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/features">Features</Link>
                            </li>
                            <li>
                                <Link to="/contact">How it Works</Link>
                            </li>
                            <li>
                                <Link to="/process">Contact Us</Link>
                            </li>
                            <li>
                                <Link to="/login" className='primaryBtn'>Login</Link>
                            </li>
                        </>
                    )}
                    {userLogin && (
                        <>
                            <li>
                                <Link to="/">Files</Link>
                            </li>
                            <li>
                                <Link to="/add-file">Add File</Link>
                            </li>
                            <li>
                                <Link to="/account">Account Manager</Link>
                            </li>
                            <li>
                                <Link to="/login" onClick={logout}>Logout</Link>
                            </li>
                            <li>
                                <p>{userData.name}</p>
                            </li>
                        </>
                    )}
                    {admin && (
                        <>
                            <li>
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/user-details">User Details</Link>
                            </li>
                            <li>
                                <Link to="/login" onClick={logout}>Logout</Link>
                            </li>
                            <li>
                                <p>{userData.name}</p>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            <button
                onClick={() => setShowLinks(prevState => !prevState)} // Toggle showLinks
                title={showLinks ? 'Hide links' : 'Show links'}>
                <MdOutlineMenu />
            </button>
        </nav>
    );
};

export default Navigation;