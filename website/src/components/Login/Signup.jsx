import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import "./signup.css";

function Create() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const Create = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, Email, Password)
    .then((userCredential) => {
      console.log(userCredential);
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <section className="signup section" id="signup">
       <section className="signup__container">
        <form onSubmit={Create}>
          <h1 className="signup">Create An Account</h1>
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
          <button className="signup__button" type="Submit">Sign Up</button>

        </form>
       </section>
    </section>
  )
}

export default Create;