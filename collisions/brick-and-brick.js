/*
 * Accepts an array of Brick instances which are movable, and an array of Brick instances
*/
function handleBrickAndBrickCollision(movableBricks, bricks) {
  
  // Handle each movable brick
  movableBricks.forEach((brick) => {

    // Skip if the brick is destroyed
    if (brick.isDestroyed()) {
      return;
    }

    // Check for a collision with each brick
    bricks.forEach((otherBrick) => {
      
      // Skip if the other brick is the same as the current brick
      if (brick === otherBrick) {
        return;
      }
      
      // Check for a collision
      if (
        brick.x < otherBrick.x + otherBrick.width &&
        brick.x + brick.width > otherBrick.x &&
        brick.y < otherBrick.y + otherBrick.height &&
        brick.y + brick.height > otherBrick.y
      ) {

        // Calculate the collision depth to determine collision side
        let overlapX = Math.min(brick.x + brick.width, otherBrick.x + otherBrick.width) - Math.max(brick.x, otherBrick.x);
        let overlapY = Math.min(brick.y + brick.height, otherBrick.y + otherBrick.height) - Math.max(brick.y, otherBrick.y);

        if (overlapX < overlapY) {
          if (brick.x < otherBrick.x) {
            // Collision from the left side of the other brick
            if (brick.xVel !== 0) {
              brick.xVel = -Math.abs(brick.xVel);
              brick.x = otherBrick.x - brick.width - 1;
            }
            if (otherBrick.xVel !== 0) {
              otherBrick.xVel = Math.abs(otherBrick.xVel);
              otherBrick.x = brick.x + brick.width + 1;
            }
          } 
          else {
            // Collision from the right side of the other brick
            if (brick.xVel !== 0) {
              brick.xVel = Math.abs(brick.xVel);
              brick.x = otherBrick.x + otherBrick.width + 1;
            }
            if (otherBrick.xVel !== 0) {
              otherBrick.xVel = -Math.abs(otherBrick.xVel);
              otherBrick.x = brick.x - otherBrick.width - 1;
            }
          }
        } 
        else {
          if (brick.y < otherBrick.y) {
            // Collision from the top side of the other brick
            if (brick.yVel !== 0) {
              brick.yVel = -Math.abs(brick.yVel);
              brick.y = otherBrick.y - brick.height - 1;
            }
            if (otherBrick.yVel !== 0) {
              otherBrick.yVel = Math.abs(otherBrick.yVel);
              otherBrick.y = brick.y + brick.height + 1;
            }
          } 
          else {
            // Collision from the bottom side of the other brick
            if (brick.yVel !== 0) {
              brick.yVel = Math.abs(brick.yVel);
              brick.y = otherBrick.y + otherBrick.height + 1;
            }
            if (otherBrick.yVel !== 0) {
              // If other brick is movable, bounce it
              otherBrick.yVel = -Math.abs(otherBrick.yVel);
              otherBrick.y = brick.y - otherBrick.height - 1;
            }
          }
        }

      }

    });
  });
}



// Export
export default handleBrickAndBrickCollision;