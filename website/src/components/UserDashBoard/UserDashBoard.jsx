import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { useHistory } from 'react-router-dom'; 
import './userdashboard.css';
import Header from '../Header/Header'

function UserDashBoard() {
  const [authUser, setAuthUser] = useState(null);
  const history = useHistory(); 

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign Out Successful");
        history.push('/'); 
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className="userdashboard section" id="userdashboard">
      <Header onSignOut={userSignOut} authUser={authUser} />
      <h2 className="userdashboard__title">User Dashboard </h2>
      <span className="userdashboard__subtitle">Welcome</span>
    </section>
  );
}

export default UserDashBoard;