import React, { useState } from "react";
import "./header.css";
import { Link } from 'react-router-dom';


function Header ({ onSignOut, authUser }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <header className="header">
      <nav className="nav container">
        <Link to="/" className="nav__logo">
          MacroTracker
        </Link>

        <div className="nav__menu">
          <ul className="nav__list grid">

          <li className="nav__item">
              <Link to="/about" className="nav__link">
                <i className="uil uil-file-alt nav__icon"></i> About
              </Link>
            </li>

            <li className="nav__item">
              <Link to="/healthfacts" className="nav__link">
                <i className="uil uil-user nav__icon"></i> Health Facts
              </Link>
            </li>

            <li className="nav__item">
              <Link to="/login" className="nav__link">
                <i className="uil uil-estate nav__icon"></i> Login
              </Link>
            </li>

            {/* Moved sign-out button to Header */}
            <li className="nav__item">
                  {authUser && (
                  <>
                    <button id="signbutton" 
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onClick={onSignOut}>
                      Sign Out
                    </button>
                    <p 
                      id="signedStatus" 
                      className={isHovered ? 'show' : ''} >
                        {`Signed In as ${authUser.email}`}
                    </p>
                  </>
                )}
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
