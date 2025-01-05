// Powerup class
class Powerup {
  
  /*
   * Accepts the x, y, radius, color, symbol, and type properties of the powerup
  */
  constructor(xPos, yPos, radius, color, symbol, type) {
    this.x = xPos;
    this.y = yPos;
    this.radius = radius;
    this.color = color;
    this.symbol = symbol;
    this.type = type;
  }
  

  /*
   * Accepts the time since the last frame
  */
  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.symbol, this.x, this.y);
  }
  
}
  


// Exports
export default Powerup;