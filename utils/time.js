/*
 * Accepts a number of seconds as an integer
 * Returns a string in the format 'M:SS'
*/
function secondsToMSS(s) {
  const minutes = String(Math.floor(s / 60));
  const seconds = String(s % 60).padStart(2, '0');
  return minutes + ':' + seconds;
}



// Exports
export {
  secondsToMSS,
}