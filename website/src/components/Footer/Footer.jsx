import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './footer.css';

const useScrollToBottom = () => {
  const [showFooter, setShowFooter] = useState(false);

  const handleScroll = () => {
    const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
    setShowFooter(scrolledToBottom);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return showFooter;
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const companyName = 'MacroTracker';
  const designerName = 'MacroTracker.co';

  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';

  const showFooter = useScrollToBottom();

  return (
    <footer className={`footer ${isLoginPage || isSignupPage ? 'fixed-footer' : ''}`}>
      {showFooter && (
        <div className="footer__content">
          <div className="footer__left">
            <p>&copy; {currentYear} {companyName}. All rights reserved.</p>
          </div>
          <div className="footer__right">
            <p>Designed and developed by {designerName}</p>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;