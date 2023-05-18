import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import About from './components/About/About';

const App = () => {
  return (
    <>
    < Header />

    <main className='main'>
      <Landing />
      <About />
    </main>
    
    </>
  );
}

export default App;
