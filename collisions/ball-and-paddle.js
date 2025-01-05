/*
 * Accepts an instance of Ball and an instance of Paddle
*/
function handleBallAndPaddleCollision(ball, paddle) {
  
  // Skip if the ball cannot collide with the paddle
  if (!paddle.enabled || ball.yVel < 0) {
    return;
  }

  // Find the closest point on the paddle to the ball
  let closestX = Math.max(paddle.x, Math.min(ball.x, paddle.x + paddle.width));
  let closestY = Math.max(paddle.y, Math.min(ball.y, paddle.y + paddle.height));

  // Calculate the distance between the ball's center and this closest point
  let distanceX = ball.x - closestX;
  let distanceY = ball.y - closestY;
  let distanceSquared = distanceX * distanceX + distanceY * distanceY;

  // Check if the distance is less than or equal to the ball's radius
  if (distanceSquared <= ball.radius * ball.radius) {
      
    // Determine the collision side
    let overlapX = ball.radius - Math.abs(distanceX);
    let overlapY = ball.radius - Math.abs(distanceY);

    if (overlapX < overlapY) {
      // Collision from the right of the paddle
      if (distanceX > 0) {
        ball.xVel = Math.abs(ball.xVel);
        ball.x = paddle.x + paddle.width + ball.radius;
        paddle.disableControls();
      } 
      // Collision from the left of the paddle
      else {
        ball.xVel = -Math.abs(ball.xVel);
        ball.x = paddle.x - ball.radius;
        paddle.disableControls();
      }
    }
    else {
      // Collision from the bottom of the paddle
      if (distanceY > 0) {
        return;
      }
      // Collision from the top of the paddle
      else {

        // Update ball
        ball.yVel = -Math.abs(ball.yVel);
        ball.y = paddle.y - ball.radius;

        // Adjust ball's horizontal velocity based on collision point
        let paddleCenterX = paddle.x + paddle.width / 2;
        let collisionOffset = ball.x - paddleCenterX;
        let maxAngle = 5 * Math.PI / 12; // Maximum angle 75 degrees

        // Normalize collisionOffset to a value between -1 and 1
        let normalizedOffset = collisionOffset / (paddle.width / 2);

        // Calculate the new horizontal velocity based on the angle
        let angle = normalizedOffset * maxAngle;
        let speed = Math.sqrt(ball.xVel * ball.xVel + ball.yVel * ball.yVel); // Preserve ball's speed

        // Apply the new velocities
        ball.xVel = speed * Math.sin(angle);
        ball.yVel = -speed * Math.cos(angle); 

      }
    }
  }
}



// Export
export default handleBallAndPaddleCollision;