"use strict";

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
console.log(current0El, current1El);

const newBtn = document.querySelector(".btn--new");
const newRoll = document.querySelector(".btn--roll");
const newHold = document.querySelector(".btn--hold");
const dice = document.querySelector(".dice");

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  dice.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

newRoll.addEventListener("click", () => {
  if (playing) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${diceNum}.png`;
    dice.classList.remove("hidden");
    if (diceNum != 1) {
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer = activePlayer == 0 ? 1 : 0;
      currentScore = 0;
      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
    }
  }
});

newHold.addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      dice.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer = activePlayer == 0 ? 1 : 0;
      currentScore = 0;
      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
    }
  }
});

newBtn.addEventListener("click", init);
