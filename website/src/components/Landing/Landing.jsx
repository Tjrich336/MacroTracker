import React from 'react';
import "./landing.css";

const Landing = () => {
  return (
      <section className="landing section" id="landing">
          <div className="landing__container container grid">
              <div className="landing__content grid">
             
                  <div className="landing__img"></div>
                  <h2 className="landing__message">Discover a healthier you with 
                      the help of a Macro Tracking website! Take charge of your 
                      well-being by effortlessly monitoring your daily vitamin intake 
                      and achieving optimal nutrition. With this user-friendly platform,
                      you can easily log and track the vitamins you consume, ensuring you
                      meet your recommended daily allowances. Get valuable insights into 
                      your nutrient profile, set personalized goals, and receive tailored 
                      recommendations to fill any gaps in your diet. Whether you're 
                      striving for improved energy levels, a stronger immune system, or 
                      overall wellness, this website empowers you to make informed choices 
                      and cultivate a balanced lifestyle. Start your journey towards a 
                      vibrant and nourished self today!
                  </h2>
              
              </div>
          </div>
      </section>
  );
};

export default Landing;