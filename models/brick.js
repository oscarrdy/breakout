// Imports
import { invertHexColor } from "../utils/colors.js";



// Brick class
class Brick {

  /*
   * Accepts the x, y, width, height, health, color, xVel, and yVel properties of the brick
  */
  constructor(x, y, width, height, health = 1, color = 'white', xVel = 0, yVel = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.health = health;
    this.color = color;
    this.xVel = xVel;
    this.yVel = yVel;
  }


  /*
   * Accepts the time since the last frame
  */
  update(deltaTime) {
    this.x += this.xVel * deltaTime
    this.y += this.yVel * deltaTime
  }


  /*
   * Accepts the canvas rendering context
  */
  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height)
    if (this.health > 1) {
      ctx.fillStyle = invertHexColor(this.color);
      ctx.fillRect(
        this.x + this.width / 4,
        this.y + this.height / 4,
        this.width / 2,
        this.height / 2
      );
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
    }
  }


  /*
   * Accepts the damage to be dealt to the brick
  */
  damage(dmg = 1) {
    this.health -= dmg;
  }

  
  /*
   * Returns whether the brick is destroyed or not
  */
  isDestroyed() {
    return this.health <= 0;
  }

}



// Static properties
Brick.baseWidth;
Brick.baseHeight;
Brick.baseSpeed = 100;



// Exports
export default Brick;