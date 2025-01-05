// Ball class
class Ball {
  
  /*
   * Accepts the x and y position of the ball, and the ball's radius
  */
  constructor(xPos, yPos, radius) {
    this.x = xPos;
    this.y = yPos;
    this.radius = radius;
    this.xVel = Ball.baseSpeed;
    this.yVel = -Ball.baseSpeed;
    this.color = 'white';
    this.explosive = false;
    this.explosions = new Map();
    this.speedMultiplier = 1;
  }


  /*
   * Accepts the time since the last frame
  */
  update(deltaTime) {
    this.x += this.xVel * this.speedMultiplier * deltaTime;
    this.y += this.yVel * this.speedMultiplier * deltaTime;
  }


  /* 
   * Accepts the canvas rendering context
  */
  render(ctx) {
    
    // Render the ball
    ctx.fillStyle = this.explosive ? 'red' : this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    if (this.explosive) {
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('💥', this.x, this.y);
    }

    // Render the explosions
    this.explosions.forEach((explosion) => {
      const fadeFactor = 0.5 - (Date.now() - explosion.time) / 3000;
      ctx.fillStyle = 'rgba(255, 0, 0, ' + fadeFactor + ')';
      ctx.beginPath();
      ctx.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2);
      ctx.fill();
    });

  }


  /*
   * Accepts the effect-name of the powerup
  */
  applyPowerupEffect(effect) {
    if (effect === 'makeExplosive') {
      this.explosive = true
    }
    else if (effect === 'increaseSpeed') {
      this.speedMultiplier += 0.25;
      setTimeout(() => {
        this.speedMultiplier -= 0.25;
      }, 10000);
    }
    else if (effect === 'decreaseSpeed') {
      this.speedMultiplier -= 0.25;
      setTimeout(() => {
        this.speedMultiplier += 0.25;
      }, 10000);
    }
  }


  /*
   * Clear all powerup effects
  */
  clearAllPowerupEffects() {
    this.isBallExplosive = false;
    this.speedMultiplier = 1;
  }


  /*
   * Returns whether the ball is explosive or not
  */
  isExplosive() {
    return this.explosive;
  }


  /*
   * Accepts the radius of the explosion
  */
  explode(radius) {
    this.explosive = false;
    const explosionId = Date.now();
    this.explosions.set(explosionId, {
      x: this.x,
      y: this.y,
      radius: radius,
      time: Date.now(),
    });
    setTimeout(() => {
      this.explosions.delete(explosionId);
    }, 3000);
  }

}



// Static properties
Ball.baseRadius;
Ball.baseSpeed = 200;



// Exports
export default Ball;