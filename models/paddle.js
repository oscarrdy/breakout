// Paddle class
class Paddle {

  /*
   * Accepts the x, y, width, and height properties of the paddle
  */
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = 'white';
    this.xVel = 0;
    this.enabled = false;
    this.baseWidth = width;
  }


  /*
   * Accepts the time since the last frame
  */
  update(deltaTime) {
    this.x += this.xVel * deltaTime;
  }


  /*
   * Accepts the canvas rendering context
  */
  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }


  /*
   * Enable the paddle to move left and right using the arrow keys or 'a' and 'd'
  */
  enableControls() {

    // Track pressed keys
    this.keysPressed = new Set();
    this.enabled = true;
  
    // Handle keydown event
    this.handleKeydown = (e) => {
      this.keysPressed.add(e.key);
      if (this.keysPressed.has('ArrowLeft') || this.keysPressed.has('a')) {
        this.xVel = -Paddle.baseSpeed;
      } 
      else if (this.keysPressed.has('ArrowRight') || this.keysPressed.has('d')) {
        this.xVel = Paddle.baseSpeed;
      }
    }
  
    // Handle keyup event
    this.handleKeyup = (e) => {
      this.keysPressed.delete(e.key);
      if (this.keysPressed.has('ArrowLeft') || this.keysPressed.has('a')) {
        this.xVel = -Paddle.baseSpeed;
      } 
      else if (this.keysPressed.has('ArrowRight') || this.keysPressed.has('d')) {
        this.xVel = Paddle.baseSpeed;
      } 
      else {
        this.xVel = 0;
      }
    }
  
    // Listen to the events
    document.addEventListener('keydown', this.handleKeydown);
    document.addEventListener('keyup', this.handleKeyup);

  }


  /*
   * Disable the paddle controls
  */
  disableControls() {
    this.enabled = false;
    if (this.handleKeydown && this.handleKeyup) {
      document.removeEventListener('keydown', this.handleKeydown);
      document.removeEventListener('keyup', this.handleKeyup);
      this.xVel = 0;
    }
  }


  /*
   * Accepts the effect-name of the powerup
  */
  applyPowerupEffect(effect) {
    if (effect === 'increaseWidth' && this.width < this.baseWidth * 4) {
      this.width += this.baseWidth / 4;
      this.x -= this.baseWidth / 8;
      setTimeout(() => {
        this.width -= this.baseWidth / 4;
        this.x += this.baseWidth / 8;
      }, 10000);
    }
    else if (effect === 'decreaseWidth' && this.width > this.baseWidth / 4) {
      this.width -= this.baseWidth / 4;
      this.x += this.baseWidth / 8;
      setTimeout(() => {
        this.width += this.baseWidth / 4;
        this.x -= this.baseWidth / 8;
      }, 10000);
    }
  }


  /*
   * Clear all powerup effects
  */
  clearAllPowerupEffects() {
    this.width = this.baseWidth;
  }

}



// Static properties
Paddle.baseWidth;
Paddle.baseHeight;
Paddle.baseSpeed = 400;



// Exports
export default Paddle;