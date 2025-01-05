/*
 * Accepts an array of Brick instances which are movable, and the canvas element
*/
function handleBrickAndBoundariesCollision(movableBricks, canvas) {
  
  // Check for a collision with each movable brick
  movableBricks.forEach((brick) => {
    
    // Brick collides with the left of the canvas
    if (brick.x < 0) {
      brick.x = 0;
      brick.xVel = Math.abs(brick.xVel);
    }

    // Brick collides with the right of the canvas
    else if (brick.x + brick.width > canvas.width) {
      brick.x = canvas.width - brick.width;
      brick.xVel = -Math.abs(brick.xVel);
    }

    // Brick collides with the top of the canvas
    else if (brick.y < 0) {
      brick.y = 0;
      brick.yVel = Math.abs(brick.yVel);
    }

    // Brick collides with the bottom of the canvas
    else if (brick.y + brick.height > canvas.height) {
      brick.y = canvas.height - brick.height;
      brick.yVel = -Math.abs(brick.yVel);
    }

  });
  
}



// Export
export default handleBrickAndBoundariesCollision;