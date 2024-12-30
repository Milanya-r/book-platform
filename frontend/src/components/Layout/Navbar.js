import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"; // Подключение стилей для Navbar

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          BookPlatform
        </Link>
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? "✖" : "☰"}
        </button>
        <div className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
          <ul className="navbar-links">
            <li>
              <NavLink
                to="/books"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Books
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/authors"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Authors
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/notifications"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Notifications
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tasks"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Tasks
              </NavLink>
            </li>
          </ul>
          <div className="navbar-actions">
            <Link to="/profile" className="navbar-profile">
              Profile
            </Link>
            <button className="language-switcher">
              🌐 Language
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
