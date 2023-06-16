import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import About from './components/About/About';
import HealthFacts from './components/HealthFacts/HealthFacts';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import UserDashBoard from './components/UserDashBoard/UserDashBoard';

function App() {
  return (
    <Router>
      <Header />
      <main className='main'>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/healthfacts" component={HealthFacts} />
          <Route path="/about" component={About} />
          <Route path="/signup" component={Signup} />
          <Route path="/userdashboard" component={UserDashBoard} />
        </Switch>
      </main>
    </Router>
  );
}

const Home = () => {
  return (
    <>
      <Landing />
      <HealthFacts />
      <About />
    </>
  );
};

export default App;
