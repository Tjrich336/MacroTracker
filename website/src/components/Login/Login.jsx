import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useHistory, Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './login.css';
library.add(faEye, faEyeSlash);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState('');
  const history = useHistory();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        history.push('/userdashboard');
      })
      .catch((error) => {
        setError('Email and password combination do not match!');
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
          <div className="password-container">
            <input
              className="password"
              type={showPassword ? 'text' : 'password'} 
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password && ( 
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="password-toggle"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
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