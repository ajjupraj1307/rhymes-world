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
  apiKey: "https://ryms-b23c2-default-rtdb.firebaseio.com/
:
null",
  authDomain: "https://ryms-b23c2-default-rtdb.firebaseio.com/
:
null",
  projectId: "https://ryms-b23c2-default-rtdb.firebaseio.com/
:
null",
  storageBucket: "https://ryms-b23c2-default-rtdb.firebaseio.com/
:
null",
  messagingSenderId: "https://ryms-b23c2-default-rtdb.firebaseio.com/
:
null",
  appId: "https://ryms-b23c2-default-rtdb.firebaseio.com/
:
null"
};

// Make db available to script.js (window is the whole browser page)
try {
  const app = initializeApp(firebaseConfig);
  window.__rhymesDB = getFirestore(app);
} catch (e) {
  console.warn("Firebase not set up yet — that's OK, the rhyme list will still work!", e);
  window.__rhymesDB = null;
}
