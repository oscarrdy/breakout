/*
 * Returns the high scores from local storage (array of objects)
*/
function fetchHighScores() {
  const highScoresJSON = localStorage.getItem('highScores');
  const highScores = highScoresJSON ? JSON.parse(highScoresJSON) : [];
  return highScores;
}



/*
 * Accepts a name (string) and a score (number)
 * Saves the high score to local storage
*/
function saveHighScore(name, score) {
  const highScore = { name, score };
  const highScores = fetchHighScores();
  highScores.push(highScore);
  highScores.sort((a, b) => b.score - a.score);
  const bestHighScores = highScores.slice(0, 5);
  localStorage.setItem('highScores', JSON.stringify(bestHighScores));
}



/*
 * Clears high scores from local storage
*/
function clearHighScores() {
  localStorage.removeItem('highScores');
}



// Exports
export { 
  fetchHighScores, 
  saveHighScore,
  clearHighScores,
}