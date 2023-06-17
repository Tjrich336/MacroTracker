import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useHistory, Link } from 'react-router-dom';

import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        history.push('/userdashboard');
      })
      .catch((error) => {
        setError('Email And Password Combination Do Not Match!');
        console.log(error);
      });
  };

  return (
    <section className="login section" id="login">
      <h2 className="login__title">Login</h2>
      <span className="login__subtitle">Register An Account</span>

      <div className="login__main-box">
        <h1 className="login">Log Into Your Account</h1>
        <form onSubmit={signIn}>
          <input
            className="email"
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="password"
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button className="login__button" type="submit">
            Log In
          </button>
        </form>
        <Link to="/signup" className="register">
          <i></i> Don't Have An Account? Register Today!
        </Link>
      </div>
    </section>
  );
}

export default Login;