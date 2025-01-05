/*
 * Accepts an instance of Ball, an array of Brick instances, and an instance of Stats
 * Returns the updated array of Brick instances
*/
function handleBallAndBrickCollision(ball, bricks, stats) {
  
  // Helpers
  const explosionRadius = bricks[0].width;
  let doExplode = false;
  
  // Check for a collision with each brick
  const updatedBricks = bricks.filter((brick) => {

    // Find the closest point on the brick to the ball
    let closestX = Math.max(brick.x, Math.min(ball.x, brick.x + brick.width));
    let closestY = Math.max(brick.y, Math.min(ball.y, brick.y + brick.height));

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
        // Collision from the right of the brick
        if (distanceX > 0) {
          ball.xVel = Math.abs(ball.xVel);
          ball.x = brick.x + brick.width + ball.radius;
        } 
        // Collision from the left of the brick
        else {
          ball.xVel = -Math.abs(ball.xVel);
          ball.x = brick.x - ball.radius;
        }
      }
      else {
        // Collision from the bottom of the brick
        if (distanceY > 0) {
          ball.yVel = Math.abs(ball.yVel);
          ball.y = brick.y + brick.height + ball.radius;
        }
        // Collision from the top of the brick
        else {
          ball.yVel = -Math.abs(ball.yVel);
          ball.y = brick.y - ball.radius;
        }
      }
      
      // Check if the ball is explosive and leave the brick to explode from the explosion instead
      if (ball.isExplosive()) {
        doExplode = true;
        ball.explode(explosionRadius);
        return true;
      }
      
      // Apply damage to the brick
      brick.damage(1);
      stats.score += 100;
      if (brick.isDestroyed()) {
        stats.totalBricksDestroyed += 1;
        stats.renderedBricks -= 1;
      }
      
      // Remove the brick if it is destroyed
      return !brick.isDestroyed();
    }

    // No collision
    return true;
  });

  // Handle explosion and return the updated bricks
  if (doExplode) {
    const blastCircle = {
      x: ball.x,
      y: ball.y,
      radius: explosionRadius,
    }
    return handleBlast(blastCircle, updatedBricks, stats);
  }
  return updatedBricks;

}



/*
 * Accepts a blast object, an array of Brick instances, and an instance of Stats
 * Returns the updated array of Brick instances
*/
function handleBlast(blast, bricks, stats) {
  
  // Check for a collision with each brick
  const updatedBricks = bricks.filter((brick) => {

    // Find the closest point on the brick to the blast
    let closestX = Math.max(brick.x, Math.min(blast.x, brick.x + brick.width));
    let closestY = Math.max(brick.y, Math.min(blast.y, brick.y + brick.height));

    // Calculate the distance between the blast's center and this closest point
    let distanceX = blast.x - closestX;
    let distanceY = blast.y - closestY;
    let distanceSquared = distanceX * distanceX + distanceY * distanceY;

    // Check if the distance is less than or equal to the blast's radius
    if (distanceSquared <= blast.radius * blast.radius) {
      
      // Apply damage to the brick
      brick.damage(1);
      stats.score += 100;
      if (brick.isDestroyed()) {
        stats.totalBricksDestroyed += 1;
        stats.renderedBricks -= 1;
      }
      
      // Remove the brick if it is destroyed
      return !brick.isDestroyed();
    }

    // No collision
    return true;
  });

  return updatedBricks;
}



// Export
export default handleBallAndBrickCollision;