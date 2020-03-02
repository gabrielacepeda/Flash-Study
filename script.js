const clear = document.getElementById("clear");
const showBtn = document.getElementById("show");
const cardsContainer = document.getElementById("cards-container");
const prevCard = document.getElementById("prev");
const currentCard = document.getElementById("current");
const nextCard = document.getElementById("next");
const addContainer = document.getElementById("add-container");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCard = document.getElementById("add-card");

// keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in DOM
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  if (index === 0) {
    card.classList.add("active");
  }
  card.innerHTML = `
    <div class="inner-card">
    <div class="inner-card-front">
      <p>${data.question}</p>
    </div>
    <div class="inner-card-back">
      <p>${data.answer}</p>
    </div>
  </div>
</div>
    `;
  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  // Add to DOM cards
  cardsEl.push(card);
  cardsContainer.appendChild(card);

  updateCurrentText();
}

function updateCurrentText() {
  currentCard.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

createCards();

// Add card to local storage
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

// Event Listeners

// Next button
nextCard.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});

// Previous Button
prevCard.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});

// Show add container
showBtn.addEventListener("click", () => addContainer.classList.add("show"));

// Hide add container
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

// Clear cards
clear.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});

// Add new card
addCard.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);
    questionEl.value = "";
    answerEl.value = "";

    addContainer.classList.remove("show");
    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

// Theme Toggle
// this one is just to wait for the page to load
// document.addEventListener("DOMContentLoaded", () => {
//   const themeStylesheet = document.getElementById("theme");
//   const themeToggle = document.getElementById("theme-toggle");
//   themeToggle.addEventListener("click", () => {
//     // if it's light -> go dark
//     if (themeStylesheet.href.includes("light")) {
//       themeStylesheet.href = "dark-theme.css";
//       themeToggle.innerText = "Switch to light mode";
//     } else {
//       // if it's dark -> go light
//       themeStylesheet.href = "light-theme.css";
//       themeToggle.innerText = "Switch to dark mode";
//     }
//     // save the preference to localStorage
//     localStorage.setItem("theme", themeStylesheet.href);
//   });
// });
