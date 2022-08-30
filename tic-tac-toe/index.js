const cell = document.querySelectorAll(".main__block-cell"),
  gameStatus = document.querySelector(".main__status"),
  gameRestart = document.querySelector(".main__restart"),
  blockCell = document.querySelector(".main__block"),
  startBtn = document.querySelector(".modal__start"),
  modalBlock = document.querySelector(".modal__block"),
  modalInputs = document.querySelectorAll(".modal__input"),
  tableCells = document.querySelectorAll("[data-table]"),
  resultsTable = document.querySelector(".main__table"),
  tableBody = document.querySelectorAll("tbody tr");

const resultingTable = {
  winnerName: "",
  yourName: "",
  opponentName: "",
  score: 0,
};

let results = [];

modalInputs.forEach((inputItem, index) => {
  if (index === 0) {
    inputItem.addEventListener("change", (event) => {
      resultingTable.yourName = event.target.value;
    });
  } else {
    inputItem.addEventListener("change", (event) => {
      resultingTable.opponentName = event.target.value;
    });
  }
});

// Status of the game
let gameActive = true;

// Current player
let player = "X";

// Places for steps
let gameState = ["", "", "", "", "", "", "", "", ""];

//Initial value for counting turns
let count = 0;

// Count turns

function showCount(count) {
  for (let el of gameState) {
    if (el !== "") {
      count += 1;
    }
  }
  return count;
}

// Insert text in the turn box
gameStatus.innerHTML = `It's ${player}'s turn`;

function isCellClicked(event) {
  const clickedCell = event.target;

  clickedCell.querySelectorAll("[data-cell-index]");
  const clickedCellIndex = +clickedCell.dataset.cellIndex;

  // If the cell is occupied or game is not started

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  isCellPlayed(clickedCell, clickedCellIndex);
  isResultConfirmed();
}

//

function isCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = player;

  clickedCell.innerHTML = player;
}

// Change the player and player's name in the turn box

function isPlayerChanged() {
  player = player === "X" ? "O" : "X";
  gameStatus.innerHTML = `It's ${player}'s turn`;
}

// Combinations of wins

const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function populateTable() {
  tableBody.forEach((tableItem, index) => {
    if (results[index]) {
      tableItem.innerHTML = `<td>${results[index].winnerName}</td>
                              <td>${results[index].score}</td>`;
    }
  });
}

// Set the result in the game

function isResultConfirmed() {
  let winner = false;

  for (let i = 0; i < wins.length; i++) {
    let a = gameState[wins[i][0]];

    let b = gameState[wins[i][1]];

    let c = gameState[wins[i][2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      winner = true;
      break;
    }
  }

  if (winner) {
    player === "X"
      ? (player = resultingTable.yourName)
      : (player = resultingTable.opponentName);

    gameStatus.innerHTML = `Player ${player} has won in ${showCount(
      count
    )} turns!`;

    const copyResultingTable = { ...resultingTable };

    copyResultingTable.winnerName = player;
    copyResultingTable.score = showCount(count);

    results.push(copyResultingTable);

    populateTable();

    // Save only 10 results

    if (results.length > 10) {
      results.shift();
      populateTable();
    }

    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    gameStatus.innerHTML = `Game ended in a draw!`;
    gameActive = false;
    return;
  }
  isPlayerChanged();
}

function isGameRestarted() {
  gameActive = true;
  player = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameStatus.innerHTML = `It's ${player}'s turn`;
  cell.forEach((cell) => (cell.innerHTML = ""));
}

cell.forEach((cell) => cell.addEventListener("click", isCellClicked));
gameRestart.addEventListener("click", isGameRestarted);

// For modal box

function startGame() {
  blockCell.style.display = "grid";
  gameRestart.style.display = "block";
  gameStatus.style.display = "block";
  modalBlock.style.display = "none";
  resultsTable.style.display = "block";
}

startBtn.addEventListener("click", () => {
  startGame();
});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("results", JSON.stringify(results));
});

window.addEventListener("load", () => {
  const gameResults = JSON.parse(localStorage.getItem("results"));

  if (gameResults?.length > 0) {
    results = gameResults;

    populateTable();
  }
});

// Disabled button

function disabledBtn() {
  const yourNameInput = document.querySelector("#yourName").value;
  const opponentNameInput = document.querySelector("#opponentName").value;

  if (yourNameInput && opponentNameInput) {
    startBtn.disabled = false;
    startBtn.classList.remove("modal__start_disabled");
  }
}
