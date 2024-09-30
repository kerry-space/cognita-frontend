import React, { ReactElement } from "react";
import "./Header.css";  // Ensure this points to the correct CSS file
import logo from "../../assets/Cognita-logo.png"


export function Header(): ReactElement {
    return (
        <nav className="navbar">
            <a className="navbar-brand" href="#">
                <img src={logo} alt="Cognita" className="navbar-logo" />
            </a>
            <div className="navbar-links">
                <a className="nav-link" href="#">Home</a>
                <a className="nav-link" href="#">UserManagement</a>
                <a className="nav-link" href="#">LogOut</a>
            </div>
        </nav>
    );
}