import React from 'react';
import { useLocation } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const companyName = 'MacroTracker';
  const designerName = 'MacroTracker.co';
  
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const issignupPage = location.pathname === '/signup';


  return (
    <footer className={`footer ${isLoginPage || issignupPage ? 'fixed-footer' : ''}`}>
      <div className="footer__content">
        <div className="footer__left">
          <p>&copy; {currentYear} {companyName}. All rights reserved.</p>
        </div>
        <div className="footer__right">
          <p>Designed and developed by {designerName}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;