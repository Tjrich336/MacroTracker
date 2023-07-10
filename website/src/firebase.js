// Import the functions you need from the SDKs you need:
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyDfHVIsMr3xa0uAHXBHZpR-ttPwhXmsBJg",
	authDomain: "macrotracker-27770.firebaseapp.com",
	projectId: "macrotracker-27770",
	storageBucket: "macrotracker-27770.appspot.com",
	messagingSenderId: "499449358808",
	appId: "1:499449358808:web:f37403e532a172285a6aad",
	measurementId: "G-39GD4JRMLF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const database = getDatabase(app);

//Exports
export { app, firestore, auth, database };
export default app;

/**
 * Reset food item for a user
 * Transform userId (email) to match query from database.
 * use imported ref and set
 * ref = references
 */
export const resetFoodItems = (userId) => {
	let transformedEmail = userId.replace(".", "_");
	console.log(transformedEmail);
	let foodItemReference = ref(database, "Users/" + transformedEmail + "/Food");
	set(foodItemReference, null)
		.then(() => {
			console.log("User's food item has been reset!");
		})
		.catch((error) => {
			console.log("Failed to reset user's food item", error);
		});
};
