import {
  collection, addDoc, getDocs, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ------------------------------------------------------------------
// 1) BUILT-IN RHYMES (these always show up, no database needed)
// ------------------------------------------------------------------
const builtInRhymes = [
  { title: "Twinkle Twinkle Little Star", emoji: "⭐",
    text: "Twinkle, twinkle, little star,\nHow I wonder what you are!\nUp above the world so high,\nLike a diamond in the sky." },
  { title: "Baa Baa Black Sheep", emoji: "🐑",
    text: "Baa, baa, black sheep,\nHave you any wool?\nYes sir, yes sir,\nThree bags full." },
  { title: "Humpty Dumpty", emoji: "🥚",
    text: "Humpty Dumpty sat on a wall,\nHumpty Dumpty had a great fall.\nAll the king's horses and all the king's men,\nCouldn't put Humpty together again." },
  { title: "Little Miss Muffet", emoji: "🕷️",
    text: "Little Miss Muffet sat on a tuffet,\nEating her curds and whey.\nAlong came a spider,\nWho sat down beside her,\nAnd frightened Miss Muffet away." },
  { title: "Hickory Dickory Dock", emoji: "🐭",
    text: "Hickory dickory dock,\nThe mouse ran up the clock.\nThe clock struck one,\nThe mouse ran down,\nHickory dickory dock." },
  { title: "Row Row Row Your Boat", emoji: "🚣",
    text: "Row, row, row your boat,\nGently down the stream.\nMerrily, merrily, merrily, merrily,\nLife is but a dream." },
  { title: "Jack and Jill", emoji: "⛰️",
    text: "Jack and Jill went up the hill,\nTo fetch a pail of water.\nJack fell down and broke his crown,\nAnd Jill came tumbling after." },
  { title: "Rock-a-bye Baby", emoji: "🌙",
    text: "Rock-a-bye baby, on the tree top,\nWhen the wind blows, the cradle will rock.\nWhen the bough breaks, the cradle will fall,\nDown will come baby, cradle and all." },
];

let allRhymes = [...builtInRhymes];

// ------------------------------------------------------------------
// 2) LOAD extra rhymes people saved to the database (if it's set up)
// ------------------------------------------------------------------
async function loadSavedRhymes() {
  const statusEl = document.getElementById("status");
  const db = window.__rhymesDB;
  if (!db) {
    statusEl.textContent = "Showing the built-in rhyme collection.";
    renderGrid(allRhymes);
    pickRhymeOfDay();
    return;
  }
  try {
    statusEl.textContent = "Fetching rhymes from the database…";
    const snapshot = await getDocs(collection(db, "rhymes"));
    const saved = snapshot.docs.map(d => d.data());
    allRhymes = [...builtInRhymes, ...saved];
    statusEl.textContent = `Showing ${allRhymes.length} rhymes.`;
  } catch (e) {
    console.warn("Could not reach the database:", e);
    statusEl.textContent = "Showing the built-in rhyme collection (database not connected yet).";
  }
  renderGrid(allRhymes);
  pickRhymeOfDay();
}

// ------------------------------------------------------------------
// 3) RENDER the cards on the page
// ------------------------------------------------------------------
function renderGrid(list) {
  const grid = document.getElementById("rhyme-grid");
  grid.innerHTML = "";
  list.forEach((rhyme) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="emoji">${rhyme.emoji || "📖"}</div>
      <h3>${escapeHtml(rhyme.title)}</h3>
      <p>${escapeHtml(rhyme.text).split("\n")[0]}…</p>
    `;
    card.addEventListener("click", () => openModal(rhyme));
    grid.appendChild(card);
  });
}

function pickRhymeOfDay() {
  const dayIndex = new Date().getDate() % allRhymes.length;
  const r = allRhymes[dayIndex];
  document.getElementById("rod-title").textContent = r.title;
  document.getElementById("rod-snippet").textContent = r.text.split("\n")[0] + "…";
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ------------------------------------------------------------------
// 4) SEARCH box
// ------------------------------------------------------------------
document.getElementById("search").addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();
  const filtered = allRhymes.filter(r => r.title.toLowerCase().includes(q));
  renderGrid(filtered);
});

// ------------------------------------------------------------------
// 5) MODAL (pop-up) to read the full rhyme
// ------------------------------------------------------------------
const modal = document.getElementById("modal");
function openModal(rhyme) {
  document.getElementById("modal-emoji").textContent = rhyme.emoji || "📖";
  document.getElementById("modal-title").textContent = rhyme.title;
  document.getElementById("modal-text").textContent = rhyme.text;
  modal.classList.remove("hidden");
}
document.getElementById("modal-close").addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.add("hidden"); });

// ------------------------------------------------------------------
// 6) ADD a new rhyme -> saves it to the database (Firestore)
// ------------------------------------------------------------------
document.getElementById("rhyme-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const text = document.getElementById("text").value.trim();
  const emoji = document.getElementById("emoji").value;
  const msg = document.getElementById("form-msg");
  const db = window.__rhymesDB;

  if (!db) {
    msg.style.color = "#ff6b6b";
    msg.textContent = "Database not connected yet — follow the README to set up Firebase first!";
    return;
  }

  try {
    msg.style.color = "#06a77d";
    msg.textContent = "Saving…";
    await addDoc(collection(db, "rhymes"), { title, text, emoji, createdAt: serverTimestamp() });
    msg.textContent = "Saved! Scroll up to see it in the list. 🎉";
    e.target.reset();
    loadSavedRhymes();
  } catch (err) {
    console.error(err);
    msg.style.color = "#ff6b6b";
    msg.textContent = "Oops, something went wrong saving that.";
  }
});

// ------------------------------------------------------------------
// GO!
// ------------------------------------------------------------------
loadSavedRhymes();
