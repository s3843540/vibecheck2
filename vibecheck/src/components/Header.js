import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import { FaSearch } from 'react-icons/fa';

function Header(props) {
    return (
        <header>
            <div class="nav-container">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <Link class="navbar-brand" to="/">Vibe Check</Link>
                    {props.user === null ?
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <Link className="nav-link" to="/sign-up">Sign Up</Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </ul> :
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                               <div class="welcome">Welcome, {props.user.username}</div>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to="/profile">My Profile</Link>
                            </li>
                            <li class="navbar-nav mr-auto">
                                <Link className="nav-link" to="/forum">Forum</Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to="/" onClick={props.logoutUser}>Log out</Link>
                            </li>
                        </ul>
                        }
                </nav> 
            </div>
        </header>
    );
}

export default Header;