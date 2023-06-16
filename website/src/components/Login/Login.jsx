import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import "./login.css";

function Login() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, Email, Password)
    .then((userCredential) => {
      console.log(userCredential);
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleButtonClick = () => {
    window.location.href = '/userdashboard';
  };

  return (
    <section className="login section" id="login">
       <h2 className="login__title">Login</h2>
       <span className="login__subtitle">Register An Account</span>

      <section className="login__container">
        <form onSubmit={signIn}>
          <h1 className="login">Log Into Your Account</h1>
          <input className="email" type="Email: " 
                 placeholder="Enter Your Email " 
                 value={Email}
                 onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input className="password" type="Password: " 
                 placeholder="Enter Your Password " 
                 value={Password}
                 onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className="login__button" type="Submit" onClick={handleButtonClick}>Log In</button>
        </form>
        <Link to="/signup" className="register">
                <i></i> Don't Have An Account? Register Today!
        </Link>
      </section>
    </section>
  )
}

export default Login;