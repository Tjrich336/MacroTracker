import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useHistory, Link } from 'react-router-dom';
import './signup.css';

function Signup() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const history = useHistory();

  const Create = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        console.log(userCredential);
        history.push('/userdashboard');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="signup section" id="signup">
      <h2 className="signup__title">Signup</h2>
      <span className="signup__subtitle">Register An Account</span>
      <section className="signup__container">
        <form onSubmit={Create}>
          <h1 className="signup">Create An Account</h1>
          <input
            className="email"
            type="Email: "
            placeholder="Enter Your Email "
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            className="password"
            type="Password: "
            placeholder="Enter Your Password "
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className="signup__button" type="submit">
            Sign Up
          </button>
        </form>
        <Link to="/login" className="login__toggle">
                <i></i> Already Have An Account? Login!
        </Link>
      </section>
    </section>
  );
}

export default Signup;