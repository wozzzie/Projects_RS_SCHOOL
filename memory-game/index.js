const memoryCards = document.querySelectorAll(".main__block-cell"),
  background = document.querySelector(".body"),
  modalBlock = document.querySelector(".modal__block"),
  resultsTable = document.querySelector(".main__table"),
  startBtn = document.querySelector(".modal__start"),
  memoryCardBlock = document.querySelector(".main__block");

let isCardFlipped = false;
let blockedCard = false;
let firstCard, secondCard;

function flip() {
  if (blockedCard) return;
  if (this === firstCard) return;

  this.classList.add("main__block-cell_flip");

  if (!isCardFlipped) {
    isCardFlipped = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  blockedCard = true;

  matchCards();
}

function matchCards() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  isMatch ? disableCards() : unflip();
}

function disableCards() {
  firstCard.removeEventListener("click", flip);
  secondCard.removeEventListener("click", flip);

  reset();
}

function unflip() {
  setTimeout(() => {
    firstCard.classList.remove("main__block-cell_flip");
    secondCard.classList.remove("main__block-cell_flip");

    reset();
  }, 1500);
}

function reset() {
  isCardFlipped = false;
  blockedCard = false;
  firstCard = null;
  secondCard = null;
}

(function shuffle() {
  memoryCards.forEach((card) => {
    let ramdomPos = Math.ceil(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})();

memoryCards.forEach((card) => card.addEventListener("click", flip));

// window.addEventListener("load", () => {
//     background.style.backgroundImage = `url(./assets/img/1.gif)`;
// });

function startGame() {
  memoryCardBlock.style.display = "grid";
  modalBlock.style.display = "none";
  resultsTable.style.display = "block";
  background.style.backgroundImage = `url(./assets/img/1.gif)`;
}

startBtn.addEventListener("click", () => {
  startGame();
});

// Disabled button

function disabledBtn() {
  const yourNameInput = document.querySelector("#yourName").value;

  if (yourNameInput) {
    startBtn.disabled = false;
    startBtn.classList.remove("modal__start_disabled");
  }
}
