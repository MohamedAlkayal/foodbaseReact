import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDcXdTg0LKy3k7XCV3t8w6F-N_ZXm_cYcI",
  authDomain: "foodbase-21559.firebaseapp.com",
  projectId: "foodbase-21559",
  storageBucket: "foodbase-21559.appspot.com",
  messagingSenderId: "44422339384",
  appId: "1:44422339384:web:a7f774ec3780282a04bfcd",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
