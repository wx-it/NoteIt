import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCbbz2rirwqa7amWWBW0KdnGQFTz_xh7-s",
  authDomain: "notee-it.firebaseapp.com",
  projectId: "notee-it",
  storageBucket: "notee-it.appspot.com",
  messagingSenderId: "273824353524",
  appId: "1:273824353524:web:5b341152c7d51b7243e2a1",
  measurementId: "G-2QQZL7RQLN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);