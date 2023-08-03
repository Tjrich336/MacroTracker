import React, { useState, useEffect } from "react";
import "./header.css";
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../../firebase';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutPrompt, setShowLogoutPrompt] = useState(false);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('/');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await auth.signOut();
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    setShowDropdown(false);
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const handleLogoutClick = () => {
    setShowLogoutPrompt(true);
  };

  const handleLogoutConfirm = () => {
    signOut();
    setShowLogoutPrompt(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutPrompt(false);
  };

  return (
    <header className="header">
      <nav className="nav container">
        <ul className="nav__logo">
          MacroTracker
        </ul>

        <div className={`nav__menu ${showDropdown ? 'show-menu' : ''}`}>
          <ul className="nav__list grid">
            <li className={`nav__item ${activeTab === '/' ? 'active-link' : ''}`} onClick={() => setActiveTab('/')}>
              <Link to="/" className="nav__link">
                <i className="uil uil-estate nav__icon"></i> Home
              </Link>
            </li>

            {/* Conditionally render "Profile" dropdown */}
            <li
              className={`nav__item ${showDropdown ? 'active-link' : ''} ${activeTab === '/profile' ? 'active-link' : ''}`}
              onClick={() => {
                toggleDropdown();
                setActiveTab('/profile');
              }}
            >
              <span className={`nav__link ${activeTab === '/profile' ? 'active-link' : ''}`}>
                <i className="uil uil-user nav__icon"></i> Profile
                <i className={`uil ${showDropdown ? 'uil-angle-up' : 'uil-angle-down'} nav__icon dropdown-icon`}></i>
              </span>
              <ul className={`dropdown ${showDropdown ? 'show-dropdown' : ''}`}>
                {isLoggedIn ? (
                  <>
                    <li
                      className={`nav__item ${activeTab === '/userdashboard' ? 'active-link' : ''}`}
                      onClick={() => setActiveTab('/userdashboard')}
                    >
                      <Link to="/userdashboard" className="nav__link">
                        <i className="uil uil-estate nav__icon"></i> User Dashboard
                      </Link>
                    </li>
                    <li className={`nav__item ${activeTab === '/logout' ? 'active-link' : ''}`} onClick={handleLogoutClick}>
                      <span className="nav__link">
                        <i className="uil uil-estate nav__icon"></i> Log Out
                      </span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className={`nav__item ${activeTab === '/login' ? 'active-link' : ''}`} onClick={() => setActiveTab('/login')}>
                      <Link to="/login" className="nav__link">
                        <i className="uil uil-estate nav__icon"></i> Login
                      </Link>
                    </li>
                    <li className={`nav__item ${activeTab === '/signup' ? 'active-link' : ''}`} onClick={() => setActiveTab('/signup')}>
                      <Link to="/signup" className="nav__link">
                        <i className="uil uil-estate nav__icon"></i> Signup
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>

            <li className={`nav__item ${activeTab === '/healthfacts' ? 'active-link' : ''}`} onClick={() => setActiveTab('/healthfacts')}>
              <Link to="/healthfacts" className="nav__link">
                <i className="uil uil-user nav__icon"></i> Health Facts
              </Link>
            </li>

            <li className={`nav__item ${activeTab === '/about' ? 'active-link' : ''}`} onClick={() => setActiveTab('/about')}>
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

      {/* Prompt for logging out */}
      {showLogoutPrompt && (
        <div className="logout-prompt-container">
          <div className="logout-prompt">
            <p>Are you sure you want to log out?</p>
              <div className="logout__buttons">
                <button onClick={handleLogoutCancel}>No</button>
                <button onClick={handleLogoutConfirm}>Yes</button>
              </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;