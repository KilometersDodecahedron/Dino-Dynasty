import React from 'react';
import "../styles/header.css";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const location = useLocation();
    return (
        <div className="header" id="header-dino">
            <h1>Dino Dynasty </h1>
            <p> A Race Before Time</p>
            <ul className="nav navbar-nav nav-flex-icons ml-auto">
                <li className="nav-right">
                    <Link to="/Rogueblitz" className={location.pathname === "" ? "nav-link active" : "nav-link"}><FontAwesomeIcon icon={faGamepad} /> Rogueblitz</Link>
                </li>
                <li className="nav-right">
                    <Link to="/game" className={location.pathname === "" ? "nav-link active" : "nav-link"}><FontAwesomeIcon icon={faGamepad} /> DinoDynasty</Link>
                </li>
            </ul>
        </div>
    )
}

export default Header;