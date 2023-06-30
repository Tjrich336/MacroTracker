import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase'; // Import the Firebase Auth and Realtime Database
import { useHistory } from 'react-router-dom';
import { getDatabase, ref, push, set } from 'firebase/database'; // Import the Firebase Realtime Database functions
import './userdashboard.css';

function UserDashboard() {
  const [authUser, setAuthUser] = useState(null);
  const [isAddingFood, setIsAddingFood] = useState(false);
  const [foodDetails, setFoodDetails] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: ''
  });
  const history = useHistory();
  const db = getDatabase(); // Create a database reference

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
        console.log('Sign Out Successful');
        history.push('/');
      })
      .catch((error) => console.log(error));
  };

  const handleAddFood = () => {
    setIsAddingFood(true);
  };

  const handleCloseModal = () => {
    setIsAddingFood(false);
    setFoodDetails({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fats: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodDetails((prevFoodDetails) => ({
      ...prevFoodDetails,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Store the entered food details in the Firebase Realtime Database
    if (authUser) {
      const email = authUser.email.replace(/\./g, '_'); // Replace "." with "_"
      const foodRef = push(ref(db, `Users/${email}/Food/${foodDetails.name}`));
      set(foodRef, {
        calories: foodDetails.calories,
        protein: foodDetails.protein,
        carbs: foodDetails.carbs,
        fats: foodDetails.fats
      })
        .then(() => {
          console.log('Food details stored successfully');
        })
        .catch((error) => {
          console.log('Error storing food details:', error);
        });
    }

    handleCloseModal();
  };

  return (
    <section className="userdashboard section" id="userdashboard">
      <h2 className="userdashboard__title">User Dashboard</h2>
      <span className="userdashboard__subtitle">Welcome</span>

      <div>
        {authUser ? (
          <>
            <p>{`Signed In as ${authUser.email}`}</p>
            <button className="signoutbutton" onClick={userSignOut}>
              Sign Out
            </button>
            <button className="addfoodbutton" onClick={handleAddFood}>
              Add Food
            </button>
          </>
        ) : (
          <p>Signed Out</p>
        )}
      </div>

      {isAddingFood && (
        <div className="modal__overlay">
          <div className="modal">
            <h3>Add Food</h3>
            <input
              type="text"
              name="name"
              placeholder="Food Name"
              value={foodDetails.name}
              onChange={handleChange}
            />
            <input
              type="number"
              name="calories"
              placeholder="Calories"
              value={foodDetails.calories}
              onChange={handleChange}
            />
            <input
              type="number"
              name="protein"
              placeholder="Protein"
              value={foodDetails.protein}
              onChange={handleChange}
            />
            <input
              type="number"
              name="carbs"
              placeholder="Carbs"
              value={foodDetails.carbs}
              onChange={handleChange}
            />
            <input
              type="number"
              name="fats"
              placeholder="Fats"
              value={foodDetails.fats}
              onChange={handleChange}
            />
            <div className="modal__buttons">
              <button onClick={handleCloseModal}>Cancel</button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default UserDashboard;