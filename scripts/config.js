function openPlayerConfig(event) {
  editedPlayer = +event.target.dataset.playerid;
  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorsOutputElement.textContent = "";
  formElement.firstElementChild.lastElementChild.value = "";

}

function savePlayerConfig(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayerName = formData.get("username").trim();

  if (!enteredPlayerName) {
    event.target.firstElementChild.classList.add("error");
    errorsOutputElement.textContent = "please enter valid name";

    return;
  }
  if (enteredPlayerName.length > 10) {
    event.target.firstElementChild.classList.add("error");
    errorsOutputElement.textContent = "The maximum number of characters is 10";
    return;
  }

  const updatedPlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
  );
  updatedPlayerDataElement.children[1].textContent = enteredPlayerName;
  players[editedPlayer - 1].name = enteredPlayerName;

  closePlayerConfig();
}
