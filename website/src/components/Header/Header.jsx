import React from "react";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="nav container">
        <a href="index.html" className="nav__logo">
          MacroTracker
        </a>

        <div className="nav__menu">
          <ul className="nav__list grid">
            <li className="nav__item">
              <a href="#login" className="nav__link">
                <i className="uil uil-estate nav__icon"></i> Login
              </a>
            </li>

            <li className="nav__item">
              <a href="#healthfacts" className="nav__link">
                <i className="uil uil-user nav__icon"></i> Health Facts
              </a>
            </li>

            <li className="nav__item">
              <a href="#about" className="nav__link">
                <i className="uil uil-file-alt nav__icon"></i> About
              </a>
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
