import React, { useState } from "react";
import "./header.css";

const Header = () => {
    /* ===================== TOGGLE MENU ===================== */
    const[Toggle, showMenu] = useState(false);

    return (
        <header className="header">
            <nav className="nav container">
                <a href="index.html" className="nav__logo">MacroTracker</a>

                <div className={Toggle ? "nav__menu show-menu" : "nav__menu"}>
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

                    <i class="uil uil-times nav__close" onClick={() => showMenu(!Toggle)}></i>
                </div>

                <div className="nav__toggle" onClick={() => showMenu(!Toggle)}>
                    <i class="uil uil-apps"></i>
                </div>
            </nav>
        </header>
    );
};

export default Header;