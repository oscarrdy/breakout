/*
 * Accepts an instance of Ball, an array of Powerup instances, an instance of Paddle, and an object of powerup settings
 * Returns the updated array of Powerup instances
*/
function handleBallAndPowerupCollision(ball, powerups, paddle, powerupSettings) {
  
  // Helpers
  let removeAll = false;
  
  // Check for a collision with each powerup
  const updatedPowerups = powerups.filter((powerup, index) => {
    
    // Calculate the distance between the ball and the powerup
    let dx = ball.x - powerup.x;
    let dy = ball.y - powerup.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    // Check if the ball collides with the powerup
    if (distance < ball.radius + powerup.radius) {
      
      // Apply the powerup effect
      if (powerup.type === 1) {
        paddle.applyPowerupEffect('increaseWidth');
      }
      else if (powerup.type === 2) {
        paddle.applyPowerupEffect('decreaseWidth');
      }
      else if (powerup.type === 3) {
        powerupSettings.spawnRate *= 0.9;
        powerupSettings.spawnLimit += 1;
      }
      else if (powerup.type === 4) {
        ball.applyPowerupEffect('increaseSpeed');
      }
      else if (powerup.type === 5) {
        ball.applyPowerupEffect('decreaseSpeed');
      }
      else if (powerup.type === 6) {
        ball.applyPowerupEffect('makeExplosive');
      }
      else if (powerup.type === 7) {
        removeAll = true;
      }
      else if (powerup.type === 8) {
        ball.applyPowerupEffect('repairBricks');
      }

      // Remove the powerup
      return false;
    }

    // No collision
    return true;
  });

  // Handle removeAll powerup and return the updated powerups
  if (removeAll) {
    return [];
  }
  return updatedPowerups;

}



// Export
export default handleBallAndPowerupCollision;