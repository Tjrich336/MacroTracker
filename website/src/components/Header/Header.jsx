import React, { useState, useEffect } from "react";
import "./header.css";
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';

function Header () {
  /**
   *  State variable to keep track of user's auth status.
   */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
   *  useEffect executes "side effects" from function components.
   *  auth.onAuthStateChanged is an event listener from firebase that checks
   *  user auth state changes.
   *  
   */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      //if user obj is present, user is logged in
      if (user) {
        setIsLoggedIn(true);  
      } else {
        //if user obj is null, user is logged out
        setIsLoggedIn(false);
      }
    })
  })

  /**
   *  async function to sign out user
   *  set isLoggedIn to false after signOut
   */
  const signOut = async () => {
    await auth.signOut();
    setIsLoggedIn(false);
  }
  
  return (
    <header className="header">
      <nav className="nav container">
        <ul className="nav__logo">
          MacroTracker
        </ul>

        <div className="nav__menu">
          <ul className="nav__list grid">
            <li className="nav__item">
              <Link to="/" className="nav__link">
                <i className="uil uil-estate nav__icon"></i> Home
              </Link>
            </li>

            {/* Conditionally render "Log Out" or "Login" based on `isLoggedIn` state */}
            {isLoggedIn ? (
              <li className="nav__item" onClick={signOut}>
                <Link to="/" className="nav__link">
                  <i className="uil uil-estate nav__icon"></i> Log Out
                </Link>
              </li>
            ) : (
              <li className="nav__item">
                <Link to="/login" className="nav__link">
                  <i className="uil uil-estate nav__icon"></i> Login
                </Link>
              </li>
            )}

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
