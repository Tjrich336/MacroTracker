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
  const [isSettingMacroGoals, setIsSettingMacroGoals] = useState(false);
  const [macroGoalInputs, setMacroGoalInputs] = useState({
    calories: '',
    protein: '',
    carbs: '',
    fats: ''
  });
  const [macroGoalDetails, setMacroGoalDetails] = useState({
    calories: '',
    protein: '',
    carbs: '',
    fats: ''
  });
  const [foodTotals, setFoodTotals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0
  });
  const history = useHistory();
  const db = getDatabase();

  useEffect(() => {
    const loadFoodItems = (user) => {
      const email = user.email.replace(/\./g, '_');
      const foodRef = ref(db, `Users/${email}/Food`);
      onValue(foodRef, (snapshot) => {
        const items = [];
        let totalCalories = 0;
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalFats = 0;
        snapshot.forEach((childSnapshot) => {
          childSnapshot.forEach((grandchildSnapshot) => {
            const item = {
              key: grandchildSnapshot.key,
              name: childSnapshot.key,
              ...grandchildSnapshot.val()
            };
            items.push(item);
            totalCalories += parseInt(item.calories);
            totalProtein += parseInt(item.protein);
            totalCarbs += parseInt(item.carbs);
            totalFats += parseInt(item.fats);
          });
        });
        setFoodItems(items);
        setFoodTotals({
          calories: totalCalories,
          protein: totalProtein,
          carbs: totalCarbs,
          fats: totalFats
        });
      });
    };

    const loadMacroGoals = (user) => {
      const email = user.email.replace(/\./g, '_');
      const macroGoalsRef = ref(db, `Users/${email}/MacroGoals`);
      onValue(macroGoalsRef, (snapshot) => {
        const goals = snapshot.val();
        if (goals) {
          setMacroGoalDetails(goals);
        }
      });
    };

    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        loadFoodItems(user);
        loadMacroGoals(user);
      } else {
        setAuthUser(null);
        setFoodItems([]);
        setMacroGoalDetails({
          calories: '',
          protein: '',
          carbs: '',
          fats: ''
        });
        setFoodTotals({
          calories: 0,
          protein: 0,
          carbs: 0,
          fats: 0
        });
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

  const handleSetMacroGoals = () => {
    setIsSettingMacroGoals(true);
    setMacroGoalInputs({
      calories: '',
      protein: '',
      carbs: '',
      fats: ''
    });
  };

  const handleCloseMacroGoals = () => {
    setIsSettingMacroGoals(false);
    setMacroGoalInputs({
      calories: '',
      protein: '',
      carbs: '',
      fats: ''
    });
  };

  const handleMacroGoalChange = (e) => {
  const { name, value } = e.target;
  setMacroGoalInputs((prevMacroGoalInputs) => ({
    ...prevMacroGoalInputs,
    [name]: value
  }));
};


const handleSaveMacroGoals = () => {
  if (
    !macroGoalInputs.calories ||
    !macroGoalInputs.protein ||
    !macroGoalInputs.carbs ||
    !macroGoalInputs.fats
  ) {
    setError('Please Fill In All Fields!');
    return;
  }

  if (authUser) {
    const email = authUser.email.replace(/\./g, '_');
    const macroGoalsRef = ref(db, `Users/${email}/MacroGoals`);
    set(macroGoalsRef, {
      calories: parseFloat(macroGoalInputs.calories),
      protein: parseFloat(macroGoalInputs.protein),
      carbs: parseFloat(macroGoalInputs.carbs),
      fats: parseFloat(macroGoalInputs.fats)
    })
      .then(() => {
        console.log('Macro goals saved successfully');
        setMacroGoalInputs({
          calories: '',
          protein: '',
          carbs: '',
          fats: ''
        });
      })
      .catch((error) => {
        console.log('Error saving macro goals:', error);
      });
  }

  handleCloseMacroGoals();
  };

  const handleRemoveFood = (foodItem) => {
    if (authUser) {
      const email = authUser.email.replace(/\./g, '_');
      const foodRef = ref(db, `Users/${email}/Food/${foodItem.name}`);
      remove(foodRef)
        .then(() => {
          console.log('Food item removed successfully');
          setFoodItems((prevFoodItems) =>
            prevFoodItems.filter((item) => item.key !== foodItem.key)
          );
        })
        .catch((error) => {
          console.log('Error removing food item:', error);
        });
    }
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

  const calculatePercentage = (value, goal) => {
    if (!value || !goal) return 0;
    return Math.round((value / goal) * 100) + '%';
  };

  const calculateTotal = (category) => {
    let total = 0;
    foodItems.forEach((foodItem) => {
      total += parseInt(foodItem[category]) || 0;
    });
    return total;
  };

  return (
    <section className="userdashboard section" id="userdashboard">
      <h2 className="userdashboard__title">User Dashboard</h2>
      <span className="userdashboard__subtitle">Welcome</span>

      <div className="button__container">
            <button className="addfoodbutton" onClick={handleAddFood}>
              Add Food
            </button>
            <button className="macrogoalsbutton" onClick={handleSetMacroGoals}>
              Set Macro Goals
            </button>
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

{isSettingMacroGoals && (
        <div className="modal__overlay">
          <div className="modal">
            <h3>Set Daily Macro Goals</h3>
            {error && <p className="error-message">{error}</p>}
            <input
              type="number"
              name="calories"
              placeholder="Calories"
              value={macroGoalInputs.calories}
              onChange={handleMacroGoalChange}
            />
            <input
              type="number"
              name="protein"
              placeholder="Protein"
              value={macroGoalInputs.protein}
              onChange={handleMacroGoalChange}
            />
            <input
              type="number"
              name="carbs"
              placeholder="Carbs"
              value={macroGoalInputs.carbs}
              onChange={handleMacroGoalChange}
            />
            <input
              type="number"
              name="fats"
              placeholder="Fats"
              value={macroGoalInputs.fats}
              onChange={handleMacroGoalChange}
            />
            <div className="modal__buttons">
              <button onClick={handleCloseMacroGoals}>Cancel</button>
              <button onClick={handleSaveMacroGoals}>Submit</button>
            </div>
          </div>
        </div>
      )}

<div className="macro-goals-container">
        <div className="macro-goal-box">
          <div className="macro-goal-box-title">Calories</div>
          <div className="macro-goal-box-content">
            {isSettingMacroGoals ? '' : calculatePercentage(foodTotals.calories, macroGoalDetails.calories)}
          </div>
        </div>
        <div className="macro-goal-box">
          <div className="macro-goal-box-title">Protein</div>
          <div className="macro-goal-box-content">
            {isSettingMacroGoals ? '' : calculatePercentage(foodTotals.protein, macroGoalDetails.protein)}
          </div>
        </div>
        <div className="macro-goal-box">
          <div className="macro-goal-box-title">Carbs</div>
          <div className="macro-goal-box-content">
            {isSettingMacroGoals ? '' : calculatePercentage(foodTotals.carbs, macroGoalDetails.carbs)}
          </div>
        </div>
        <div className="macro-goal-box">
          <div className="macro-goal-box-title">Fats</div>
          <div className="macro-goal-box-content">
            {isSettingMacroGoals ? '' : calculatePercentage(foodTotals.fats, macroGoalDetails.fats)}
          </div>
        </div>
      </div>

      <div>
        <h3 className="table__title">Food Items</h3>
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
                  <th>Actions</th>
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
                      <button className="removefoodbutton" onClick={() => handleRemoveFood(foodItem)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tr>
                  <th>Totals:</th>
                  <th>{calculateTotal('calories')}</th>
                  <th>{calculateTotal('protein')}</th>
                  <th>{calculateTotal('carbs')}</th>
                  <th>{calculateTotal('fats')}</th>
                  <th></th>
                </tr>
            </table>
          </div>
        ) : (
          <p>No food items found.</p>
        )}
      </div>
      <div>
        {authUser ? (
          <>
            <p className="signedInAs">{`Signed In as ${authUser.email}`}</p>
            <button className="signoutbutton" onClick={userSignOut}>
              Sign Out
            </button>
          </>
        ) : (
          <p>Signed Out</p>
        )}
      </div>
    </section>
  );
}

export default UserDashboard;