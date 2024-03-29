import React from 'react';
import './landing.css';
import futuristicHealth from '../../assets/futuristicHealth.png';
import LandingTextBlock from "./TextBlock/LandingTextBlock";

function Landing () {
  const handleButtonClick = () => {
    window.location.href = '/signup';
  };
  

  return (
      <section className="landing section" id="landing">
        <div className="container">
          <div className="container_img"><img src={futuristicHealth} alt="" /></div>
          <div className="container_text">
            <h1 className='landingTitle '>Discover a healthier you!</h1>
            <LandingTextBlock className="landingTextBlock"></LandingTextBlock>
            <button className="login-button" onClick={handleButtonClick}> Get Started Today! </button>
          </div>
        </div>
      </section>
  );
}

export default Landing;
