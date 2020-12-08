import React from 'react';
import "../styles/headerR.css";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';

function HeaderR() {
    const location = useLocation();
    return (
        <div className="header">
            <h1>RogueBlitz </h1>
            <ul className="nav navbar-nav nav-flex-icons ml-auto">
                <li className="nav-item">
                    <Link to="/Rogueblitz" className={location.pathname === "" ? "nav-link active" : "nav-link"}><FontAwesomeIcon icon={faGamepad} /> Rogueblitz</Link>
                </li>
                <li className="nav-item">
                    <Link to="/game" className={location.pathname === "" ? "nav-link active" : "nav-link"}><FontAwesomeIcon icon={faGamepad} /> DinoDynasty</Link>
                </li>
            </ul>
        </div>
    )
}

export default HeaderR;