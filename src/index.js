import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/firestore'; 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyATMXM4xSObAhwOK5I5tb6TxsuIBxNeK40",
  authDomain: "cart-e7df0.firebaseapp.com",
  projectId: "cart-e7df0",
  storageBucket: "cart-e7df0.appspot.com",
  messagingSenderId: "823324901742",
  appId: "1:823324901742:web:8b0b987b2b9c4acf49417f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

