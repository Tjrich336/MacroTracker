import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { useHistory } from 'react-router-dom'; 
import './userdashboard.css';
import Header from '../Header/Header'
import DashboardBox from './DashboardBox';
import Modal from './Modal';

function UserDashBoard() {
  const [authUser, setAuthUser] = useState(null);
  const history = useHistory(); 
  const [isModalVisible, setIsModalVisible] = useState(null);

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

      <div className="dashboard-boxes">
        {Array.from({ length: 6 }, (_, i) => (
          <DashboardBox 
            key={i} 
            title={`Box ${i}`} 
            onClick={() => setIsModalVisible(i)}
            index={i}
          />
        ))}
      </div>
      <Modal isVisible={isModalVisible !== null} onClose={() => setIsModalVisible(null)}>
        {isModalVisible === 0 && <div>Content here</div>}
        {isModalVisible === 1 && <div>Content here</div>}
        {isModalVisible === 2 && <div>Content here</div>}
        {isModalVisible === 3 && <div>Content here</div>}
        {isModalVisible === 4 && <div>Content here</div>}
        {isModalVisible === 5 && <div>Content here</div>}
      </Modal>

    </section>
  );
}

export default UserDashBoard;