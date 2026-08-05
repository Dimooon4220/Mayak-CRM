// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC908j7v8Z20YULvc81Pg9kxmAYHalU84A",
  authDomain: "mayak-club-management.firebaseapp.com",
  projectId: "mayak-club-management",
  storageBucket: "mayak-club-management.firebasestorage.app",
  messagingSenderId: "134105968857",
  appId: "1:134105968857:web:064ee8f9c2452522218ec8"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

export { app, db, storage };