function resetGameStatus() {
  gameIsOver = false;
  activePlayer = 0;
  currentRound = 1;
  gameOverElement.firstElementChild.innerHTML =
    'You won, <span id="winner-name">PLAYER NAME</span>!';
  gameOverElement.style.display = "none";
  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      gameBoardItemElement.textContent = "";
      gameBoardItemElement.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (!players[0].name && !players[1].name) {
    alert("please enter name for each player");
    return;
  }

  resetGameStatus();

  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  if (activePlayer == 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (event.target.tagName !== "LI" || gameIsOver) {
    return;
  }
  const selectedField = event.target;
  const selectedCol = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedCol] > 0) {
    alert("please select empty field");
    return;
  }

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedCol] = activePlayer + 1;
  const winerId = checkGameOver();
  if (winerId !== 0) {
    endGame(winerId);
  }
  currentRound++;
  switchPlayer();
}

function checkGameOver() {
  //check for row equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }
  //check for col equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }
  //check for diagonal
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }
  if (
    gameData[0][2] > 0 &&
    gameData[0][2] === gameData[1][1] &&
    gameData[1][1] === gameData[2][0]
  ) {
    return gameData[0][2];
  }
  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

function endGame(winerId) {
  gameIsOver = true;
  gameOverElement.style.display = "block";
  if (winerId > 0) {
    const winnerName = players[winerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "it's a draw";
  }
}
