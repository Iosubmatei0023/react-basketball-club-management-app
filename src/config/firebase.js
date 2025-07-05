import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWmb2Xtw2Jb77aZ0-AoJPhLrYE9kH9HiE",
  authDomain: "fir-react-management.firebaseapp.com",
  projectId: "fir-react-management",
  storageBucket: "fir-react-management.firebasestorage.app",
  messagingSenderId: "729600282821",
  appId: "1:729600282821:web:9fbabc19f729439e65e0ac",
  measurementId: "G-TQG176Z03T",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
