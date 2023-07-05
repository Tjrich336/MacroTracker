import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { useHistory } from 'react-router-dom';
import { getDatabase, ref, push, set, remove, onValue } from 'firebase/database';
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
  const [error, setError] = useState('');
  const [foodItems, setFoodItems] = useState([]);
  const history = useHistory();
  const db = getDatabase();

  useEffect(() => {
    const loadFoodItems = (user) => {
      const email = user.email.replace(/\./g, '_');
      const foodRef = ref(db, `Users/${email}/Food`);
      onValue(foodRef, (snapshot) => {
        const items = [];
        snapshot.forEach((childSnapshot) => {
          childSnapshot.forEach((grandchildSnapshot) => {
            const item = {
              key: grandchildSnapshot.key,
              name: grandchildSnapshot.key,
              ...grandchildSnapshot.val()
            };
            items.push(item);
          });
        });
        setFoodItems(items);
      });
    };    

    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        loadFoodItems(user);
      } else {
        setAuthUser(null);
        setFoodItems([]);
      }
    });

    return () => {
      listen();
    };
  }, [db]);

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
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodDetails((prevFoodDetails) => ({
      ...prevFoodDetails,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (
      !foodDetails.name ||
      !foodDetails.calories ||
      !foodDetails.protein ||
      !foodDetails.carbs ||
      !foodDetails.fats
    ) {
      setError('Please Fill In All Fields!');
      return;
    }

    if (authUser) {
      const email = authUser.email.replace(/\./g, '_');
      const foodRef = push(ref(db, `Users/${email}/Food`));
      set(foodRef, {
        [foodDetails.name]: {
          calories: foodDetails.calories,
          protein: foodDetails.protein,
          carbs: foodDetails.carbs,
          fats: foodDetails.fats
        }
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
  

  const handleRemoveFood = (name) => {
    if (authUser) {
      const email = authUser.email.replace(/\./g, '_');
      const foodRef = ref(db, `Users/${email}/Food/${name}`);
      remove(foodRef)
        .then(() => {
          console.log('Food item removed successfully');
        })
        .catch((error) => {
          console.log('Error removing food item:', error);
        });
    }
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
            {error && <p className="error-message">{error}</p>}
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
  
  <div>
  <h3>Food Items</h3>
  {foodItems.length > 0 ? (
    <div className="table-container">
      <table className="food-items-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Calories</th>
            <th>Protein</th>
            <th>Carbs</th>
            <th>Fats</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((foodItem) => (
          <tr key={foodItem.key}>
            <td>{foodItem.name || ''}</td>
            <td>{foodItem.calories || ''}</td>
            <td>{foodItem.protein || ''}</td>
            <td>{foodItem.carbs || ''}</td>
            <td>{foodItem.fats || ''}</td>
            <td>
            <button onClick={() => handleRemoveFood(foodItem.key)}>Remove</button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>No food items found.</p>
    )}
    </div>
  </section>
  );  
}

export default UserDashboard;