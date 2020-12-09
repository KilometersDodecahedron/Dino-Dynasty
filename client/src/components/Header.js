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
            <h1>  A Race Before Time</h1>
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