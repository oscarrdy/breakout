// Imports
import Game from './game.js';
import { fetchHighScores, saveHighScore } from './utils/localstorage.js';



// Get the canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



// Get DOM elements
const elmHighScoreTable = document.getElementById('elmHighScoreTable');
const templateHighScoreRow = document.getElementById("templateHighScoreRow");
const elmStatsTable = document.getElementById('elmStatsTable');
const templateStatsRow = document.getElementById("templateStatsRow");
const elmStartMenu = document.getElementById("elmStartMenu");
const startButton = document.getElementById('btnStart');
const elmGameOverMenu = document.getElementById("elmGameOverMenu");
const elmGameOverTitle = document.getElementById("elmGameOverTitle");
const continueButton = document.getElementById('btnContinue');
const elmGamePausedMenu = document.getElementById("elmGamePausedMenu");
const resumeButton = document.getElementById('btnResume');



// Construct tables
function displayHighScores(highScores) {
  const selectorPosition = ".high-score-table__row-position";
  const selectorName = ".high-score-table__row-name";
  const selectorScore = ".high-score-table__row-score";
  elmHighScoreTable.innerHTML = "";
  if (highScores.length === 0) {
    const div = document.createElement("div");
    div.classList.add("high-score-table__empty-text");
    div.textContent = "Your high scores will appear here!";
    elmHighScoreTable.appendChild(div);
  }
  highScores.forEach((highScore, index) => {
    const row = templateHighScoreRow.content.cloneNode(true);
    row.querySelector(selectorPosition).textContent = index + 1 + ".";
    row.querySelector(selectorName).textContent = highScore.name.toLowerCase();
    row.querySelector(selectorScore).textContent = highScore.score;
    elmHighScoreTable.appendChild(row);
  });
}

function displayStats(stats) {
  const selectorRowName = ".stats-table__row-name";
  const selectorRowValue = ".stats-table__row-value";
  elmStatsTable.innerHTML = "";
  stats.forEach((stat) => {
    const row = templateStatsRow.content.cloneNode(true);
    row.querySelector(selectorRowName).textContent = stat.label;
    row.querySelector(selectorRowValue).textContent = stat.value;
    elmStatsTable.appendChild(row);
  });
}



// Initialize the game
displayHighScores(fetchHighScores());
const game = new Game(ctx, canvas);



// Handle action buttons
startButton.addEventListener('click', () => {
  elmStartMenu.setAttribute("data-hidden", "");
  game.start();
});

continueButton.addEventListener('click', () => {
  elmGameOverMenu.setAttribute("data-hidden", "");
  elmStartMenu.removeAttribute("data-hidden");
  displayHighScores(fetchHighScores());
  game.init();
  game.render();
});

resumeButton.addEventListener('click', () => {
  elmGamePausedMenu.setAttribute("data-hidden", "");
  game.start();
});



// Handle game events
document.addEventListener('gameover', (e) => {
  elmGameOverMenu.removeAttribute("data-hidden");
  displayStats(e.detail.stats);
  setTimeout(() => {
    const name = prompt("Enter your name to save the score:");
    if (name) {
      saveHighScore(name, e.detail.score);
    }
  }, 300);
});

document.addEventListener("gamecompleted", (e) => {
  elmGameOverTitle.textContent = "Game Completed";
  elmGameOverMenu.removeAttribute("data-hidden");
  displayStats(e.detail.stats);
  setTimeout(() => {
    const name = prompt("Enter your name to save the score:");
    if (name) {
      saveHighScore(name, e.detail.score);
    }
  }, 300);
});

document.addEventListener('gamepaused', () => {
  elmGamePausedMenu.removeAttribute("data-hidden");
});