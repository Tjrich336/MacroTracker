import React from 'react';
import './about.css';

function About() {
  return (
    <section className="about section" id="about">
      <h2 className="about__title">About</h2>
      <span className="about__subtitle">Contact</span>

      <div className="about__content">
        <h3 className="content__title">Our Mission</h3>
          <p className="content">
            At Macro Tracker, we are passionate about health and well-being. In today's world, where rapid health decline has become a concerning trend, we believe in taking proactive steps to improve our lives. That's why we created Macro Tracker – to provide a powerful tool for tracking your macronutrient intake and promoting a balanced lifestyle.
            Our goal is to empower individuals to make informed choices about their nutrition, fitness, and overall health. By understanding and monitoring macronutrients, you can optimize your diet, achieve your health goals, and prevent various chronic diseases.
            Join us on this journey towards better health and well-being. Together, we can make positive changes and inspire others to prioritize their health in the face of the global health challenges we currently face.
          </p>

        <h4 className="disclaimer">Disclaimer</h4>
          <p className="disclaimer__content">The information provided on this website is for general informational purposes only and should not be considered as a substitute for professional medical advice. Consult a healthcare professional for personalized advice regarding your dietary needs and health conditions.
            The macro tracking data presented on this website are based on general guidelines and may not be suitable for everyone. Individual nutritional needs can vary. Use this information at your own risk and consult a registered dietitian for personalized guidance.
            While we strive to provide accurate information, we make no warranties regarding the completeness, accuracy, or reliability of the data. We are not liable for any loss or damage arising from the use of this website or reliance on the information provided.
            The accuracy of macro tracking data can vary based on factors such as data entry and food preparation methods. Always cross-reference the information and consult a healthcare professional before making significant dietary changes.
            By using this website, you acknowledge and accept this disclaimer. If you do not agree, please refrain from using our website.
          </p>

          <h5 className="team">Meet The Team</h5>
            <p className="team__content">Trevor Richardson</p>
            <p className="team__content">Orin Sparks</p>
            <p className="team__content">Brandon Hach</p>

          <h6 className="contact">Reach Out!</h6>
          

      </div>
    </section>
  );
}

export default About;