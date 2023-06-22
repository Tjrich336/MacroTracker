import React, { useState } from 'react';
import "./healthfacts.css";

const facts = [
  {
    fact: "Regular exercise reduces the risk of chronic diseases such as heart disease, diabetes, and certain types of cancer.",
    source: "Centers for Disease Control and Prevention",
  },
  {
    fact: "Adequate sleep enhances cognitive function, strengthens the immune system, and promotes mental well-being.",
    source: "National Sleep Foundation",
  },
  {
    fact: "Consuming a balanced diet rich in fruits, vegetables, whole grains, and lean proteins can help prevent obesity, lower the risk of chronic diseases, and promote overall health.",
    source: "Academy of Nutrition and Dietetics",
  },
  {
    fact: "Regular physical activity can help reduce symptoms of anxiety and depression and improve mental health.",
    source: "National Institute of Mental Health",
  },
  {
    fact: "Drinking an adequate amount of water helps maintain proper bodily functions, improves digestion, and supports healthy skin.",
    source: "Harvard Health Publishing",
  },
  {
    fact: "Engaging in mindfulness practices, such as meditation or deep breathing, can reduce stress levels and improve overall well-being.",
    source: "Mayo Clinic",
  },
  {
    fact: "Avoiding smoking and limiting alcohol consumption can significantly reduce the risk of developing various health conditions, including cancer and liver disease.",
    source: "National Cancer Institute",
  },
  {
    fact: "Maintaining strong social connections and engaging in social activities can improve mental health and lower the risk of cognitive decline.",
    source: "Alzheimer's Association",
  },
  {
    fact: "Regular dental check-ups and proper oral hygiene practices are essential for maintaining healthy teeth and gums.",
    source: "American Dental Association",
  },
  {
    fact: "Spending time outdoors and being exposed to natural light can boost vitamin D levels, enhance mood, and improve sleep quality.",
    source: "National Institute for Health and Care Excellence",
  },
  {
    fact: "Practicing good hand hygiene, such as washing hands frequently with soap and water, can help prevent the spread of infectious diseases.",
    source: "Centers for Disease Control and Prevention",
  },
  {
    fact: "Maintaining a healthy work-life balance is crucial for reducing stress, improving mental well-being, and preventing burnout.",
    source: "World Health Organization",
  },
  {
    fact: "Eating a variety of colorful fruits and vegetables provides essential vitamins, minerals, and antioxidants that promote good health.",
    source: "American Heart Association",
  },
  {
    fact: "Regular stretching exercises improve flexibility, prevent muscle stiffness, and reduce the risk of injuries.",
    source: "American Council on Exercise",
  },
  {
    fact: "Practicing deep breathing exercises can help reduce stress, lower blood pressure, and improve lung function.",
    source: "American Lung Association",
  },
  {
    fact: "Getting regular eye exams can detect vision problems early and prevent potential eye diseases.",
    source: "American Academy of Ophthalmology",
  },
  {
    fact: "Laughing has numerous health benefits, including boosting the immune system, relieving pain, and reducing stress.",
    source: "Mayo Clinic",
  },
  {
    fact: "Maintaining good posture while sitting and standing improves spinal alignment and reduces the risk of back pain.",
    source: "American Chiropractic Association",
  }
];

function HealthFacts() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? Math.ceil(facts.length / 3) - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === Math.ceil(facts.length / 3) - 1 ? 0 : prevSlide + 1
    );
  };  

  return (
    <section className="healthfacts section" id="healthfacts">
      <h2 className="healthfacts__title">Health Facts</h2>
      <span className="healthfacts__subtitle">Tips & Tricks</span>

      <h3 className="content__title">Why Should You Track Your Health?</h3>

      <div className="healthfacts__content">
        <ul>
          <li>
            According to the World Health Organization (WHO), noncommunicable diseases (NCDs) such as heart disease,
            stroke, cancer, diabetes, and respiratory conditions account for 71% of global deaths. Regular health tracking
            allows early detection and intervention, reducing the risk of developing these diseases.
            A study published in the American Journal of Preventive Medicine found that individuals who monitored their
            physical activity, diet, and weight had a higher likelihood of achieving and maintaining a healthy body weight
            compared to those who did not track their health.
          </li>

          <li className="para__content">
            Overconsumption of food can have detrimental effects on our health. When we consume more calories than our body needs, it can lead to weight gain and increase the risk of developing chronic diseases such as obesity, diabetes, and heart disease. Excessive intake of unhealthy fats, sugars, and processed foods can also contribute to poor nutrition and nutrient deficiencies.
            Maintaining a healthy balance of macronutrients is crucial for optimal health. The recommended macronutrient distribution varies depending on individual factors such as age, sex, activity level, and overall health goals. In general, a healthy range for macronutrients includes:
            <li className="para__facts">
              <span className="category">Carbohydrates</span>
              <span className="cat__content">Carbohydrates should make up around 45-65% of your daily caloric intake. Choose complex carbohydrates such as whole grains, fruits, and vegetables, which provide fiber, vitamins, and minerals, while limiting refined sugars and processed foods.</span>
              <br/><br/>
              <span className="category">Proteins</span>
              <span className="cat__content">Proteins should constitute around 10-35% of your daily caloric intake. Opt for lean protein sources such as poultry, fish, legumes, and tofu. Proteins are essential for muscle repair, hormone production, and immune function.</span>
              <br/><br/>
              <span className="category">Fats</span>
              <span className="cat__content">Fats should account for about 20-35% of your daily caloric intake. Focus on consuming healthy fats from sources like nuts, seeds, avocados, and olive oil. These provide essential fatty acids and support various bodily functions.</span>
            </li>
            By maintaining a balanced diet within these recommended ranges, you can support your overall health and well-being while minimizing the risk of nutrient imbalances and chronic diseases associated with overconsumption and poor nutrition. It is important to consult with a healthcare professional or registered dietitian for personalized guidance based on your specific needs and health goals.
          </li>
        </ul>

        <h3 className="carousel__title">Did you know?</h3>
        <div className={`healthfacts__carousel ${currentSlide === 0 ? '' : 'translate-left'} ${currentSlide === Math.ceil(facts.length / 3) ? '' : 'translate-right'}`}>
          {facts.slice(currentSlide * 3, currentSlide * 3 + 3).map((fact, index) => (
            <div key={index} className={`healthfacts__fact ${index === 1 ? 'center-item' : ''}`}>
              <p>{fact.fact}</p>
              <p className="healthfacts__fact-source">(Source: {fact.source})</p>
            </div>
          ))}
        </div>

        <div className="healthfacts__controls">
          <button className="carousel__button" onClick={handlePrevSlide}>
            &lt;
          </button>
          <button className="carousel__button" onClick={handleNextSlide}>
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
}

export default HealthFacts;