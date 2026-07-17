// ============================================================
// 🔌 THIS FILE CONNECTS YOUR WEBSITE TO ITS "BACKEND + DATABASE"
// ============================================================
// We are using Firebase (made by Google) as our backend & database.
// It is 100% FREE for small projects like this one.
//
// 👉 Follow the README.md "Step 2: Set up your database" instructions
//    to get YOUR OWN config values below, then replace the text
//    that says "PASTE_YOUR_..." with your real values.
//
// Don't worry if you haven't done that yet — the website will still
// show all the built-in rhymes without it. You only need this part
// working for the "Add your own rhyme" box to save new rhymes.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmUFaKJjG81sd5vV2o27WIDLAZabKSjYQ",
  authDomain: "ryms-b23c2.firebaseapp.com",
  projectId: "ryms-b23c2",
  storageBucket: "ryms-b23c2.firebasestorage.app",
  messagingSenderId: "609914987761",
  appId: "1:609914987761:web:741efd1a52dfe8cc887550"
};

// Make db available to script.js (window is the whole browser page)
try {
  const app = initializeApp(firebaseConfig);
  window.__rhymesDB = getFirestore(app);
} catch (e) {
  console.warn("Firebase not set up yet — that's OK, the rhyme list will still work!", e);
  window.__rhymesDB = null;
}
