import React from "react";
import "./header.css";
import { Link } from 'react-router-dom';

function Header () {
  return (
    <header className="header">
      <nav className="nav container">
        <a href="/" className="nav__logo">
          MacroTracker
        </a>

        <div className="nav__menu">
          <ul className="nav__list grid">
            <li className="nav__item">
              <Link to="/login" className="nav__link">
                <i className="uil uil-estate nav__icon"></i> Login
              </Link>
            </li>

            <li className="nav__item">
              <Link to="/healthfacts" className="nav__link">
                <i className="uil uil-user nav__icon"></i> Health Facts
              </Link>
            </li>

            <li className="nav__item">
              <Link to="/about" className="nav__link">
                <i className="uil uil-file-alt nav__icon"></i> About
              </Link>
            </li>
          </ul>
        </div>

        <div className="nav__toggle">
          <i className="uil uil-apps"></i>
        </div>
      </nav>
    </header>
  );
};

export default Header;
