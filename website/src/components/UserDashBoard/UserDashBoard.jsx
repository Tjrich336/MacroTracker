import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import './userdashboard.css';

function UserDashBoard() {

    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            }
            else {
                setAuthUser(null);
            }
        });

        return () => {
            listen();
        }
    }, []);

    const userSignOut = () => {
        signOut(auth).then(() => {
            setAuthUser(null);
            console.log("Sign Out Successful")
        }).catch(error => console.log(error))
    }

  return (
    <section className="userdashboard section" id="userdashboard">
       <h2 className="userdashboard__title">User Dashboard </h2>
       <span className="userdashboard__subtitle">Welcome</span>
        <div>{ authUser ? <><p>{`Signed In as ${authUser.email}`}</p><button className='signoutbutton' onClick={userSignOut}>Sign Out</button></> : <p>Signed Out</p>}</div>
    </section>
  )
}

export default UserDashBoard;