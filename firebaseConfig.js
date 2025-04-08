// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBII-V_Xabgv4XWpXPM-lpwmbp_1JdMPcM",
  authDomain: "testing-firebase-6ddf1.firebaseapp.com",
  projectId: "testing-firebase-6ddf1",
  storageBucket: "testing-firebase-6ddf1.firebasestorage.app",
  messagingSenderId: "984457803866",
  appId: "1:984457803866:web:ab5967017785b483f34063"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
