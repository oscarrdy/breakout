/*
 * Accepts an instance of Ball, and the canvas element
*/
function handleBallAndBoundariesCollision(ball, canvas) {
  
  // The ball collides with the top of the canvas
  if (ball.y - ball.radius <= 0) {
    ball.yVel = Math.abs(ball.yVel);
    ball.y = ball.radius;
  }

  // The ball collides with the left of the canvas
  else if (ball.x - ball.radius <= 0) {
    ball.xVel = Math.abs(ball.xVel);
    ball.x = ball.radius;
  }

  // The ball collides with the right of the canvas
  else if (ball.x + ball.radius >= canvas.width) {
    ball.xVel = -Math.abs(ball.xVel);
    ball.x = canvas.width - ball.radius;
  }
  
}



// Export
export default handleBallAndBoundariesCollision;