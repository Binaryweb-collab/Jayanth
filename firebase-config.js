import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBjTmyxKq...",
    authDomain: "neocampus-e2679.firebaseapp.com",
    databaseURL: "https://neocampus-e2679-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "neocampus-e2679",
    storageBucket: "neocampus-e2679.appspot.com",
    messagingSenderId: "661813565916",
    appId: "1:661813565916:web:8e47a80cbff1495b751719",
    measurementId: "G-Y4X6B53HQL"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function loginUser(userid, password) {
    try {
        const usersRef = ref(db, "login-data");
        const snapshot = await get(usersRef);
        if (!snapshot.exists()) {
            alert("No user data found in the database.");
            return false;
        }
        let isValid = false;
        snapshot.forEach((childSnapshot) => {
            const userData = childSnapshot.val();
            if (userData.userid === userid && userData.password === password) {
                isValid = true;
            }
        });
        if (isValid) {
            sessionStorage.setItem("userId", userid);
            console.log("Login successful, userId saved:", sessionStorage.getItem("userId"));
            return true;
        } else {
            alert("Invalid User ID or Password.");
            return false;
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login.");
        return false;
    }
}

export { loginUser };