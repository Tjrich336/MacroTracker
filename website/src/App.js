import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import About from './components/About/About';
import HealthFacts from './components/HealthFacts/HealthFacts';

const App = () => {
  return (
    <>
    <Header />

    <main className='main'>
      <HealthFacts />
      <About />
    </main>
    
    </>
  );
}

export default App;
