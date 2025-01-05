/*
 * Accepts an instance of Paddle, and the canvas element
*/
function handlePaddleAndBoundariesCollision(paddle, canvas) {
  
  // The paddle collides with the left of the canvas
  if (paddle.x < 0) {
    paddle.x = 0;
  }

  // The paddle collides with the right of the canvas
  if (paddle.x + paddle.width > canvas.width) {
    paddle.x = canvas.width - paddle.width;
  }
  
}



// Export
export default handlePaddleAndBoundariesCollision;