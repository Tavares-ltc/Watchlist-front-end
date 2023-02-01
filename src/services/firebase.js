import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfPYUhvxqNtmloTCrMp3Zz0hXZtlnOSO4",
  authDomain: "watchlist-fastest.firebaseapp.com",
  projectId: "watchlist-fastest",
  storageBucket: "watchlist-fastest.appspot.com",
  messagingSenderId: "66127903905",
  appId: "1:66127903905:web:9e5f41cc7cd31be05d44e0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export { auth, provider}
