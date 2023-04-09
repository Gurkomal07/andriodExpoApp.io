// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyDs8lcJfdBO2xahG9qRHfQxbZlM_WdEZvw",
//   authDomain: "world2opinion.firebaseapp.com",
//   databaseURL: "https://world2opinion-default-rtdb.firebaseio.com",
//   projectId: "world2opinion",
//   storageBucket: "world2opinion.appspot.com",
//   messagingSenderId: "872516887044",
//   appId: "1:872516887044:web:d2e3e426362b0d47dc8b51",
//   measurementId: "G-0KNC73MJ16"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyDs8lcJfdBO2xahG9qRHfQxbZlM_WdEZvw",
//   authDomain: "world2opinion.firebaseapp.com",
//   databaseURL: "https://world2opinion-default-rtdb.firebaseio.com",
//   projectId: "world2opinion",
//   storageBucket: "world2opinion.appspot.com",
//   messagingSenderId: "872516887044",
//   appId: "1:872516887044:web:905746183aed9c6cdc8b51",
//   measurementId: "G-QS1YPLJ86G"
// };


//my own firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAMXEMEZhjqp_Zk8KWNN_1nw2l9sX92m08",
  authDomain: "oceanic-trees-378121.firebaseapp.com",
  projectId: "oceanic-trees-378121",
  storageBucket: "oceanic-trees-378121.appspot.com",
  messagingSenderId: "690770123346",
  appId: "1:690770123346:web:61f165400413d496b01d8b",
  measurementId: "G-HG376EVTG2"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDaFG-jf_KBzJTX4aga_QY-sHVtWNsPG4Q",
//   authDomain: "two-world-sopinion-proj.firebaseapp.com",
//   databaseURL: "https://two-world-sopinion-proj-default-rtdb.firebaseio.com",
//   projectId: "two-world-sopinion-proj",
//   storageBucket: "two-world-sopinion-proj.appspot.com",
//   messagingSenderId: "630623773065",
//   appId: "1:630623773065:web:fa5eefce8db75d4b9c4158",
//   measurementId: "G-V8JZK9HH4B"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default {app};