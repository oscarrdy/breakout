// Imports
import Brick from './models/brick.js';
import Ball from './models/ball.js';
import Paddle from './models/paddle.js';
import Powerup from './models/powerup.js';
import Stats from './models/stats.js';
import levels from './data/levels.js';
import powerups from './data/powerups.js';
import { getRandomHexColor } from './utils/colors.js';
import { secondsToMSS } from './utils/time.js';
import handleBallAndPowerupCollision from './collisions/ball-and-powerup.js';
import handleBallAndBrickCollision from './collisions/ball-and-brick.js';
import handleBallAndPaddleCollision from './collisions/ball-and-paddle.js';
import handleBallAndBoundariesCollision from './collisions/ball-and-boundaries.js';
import handlePaddleAndBoundariesCollision from './collisions/paddle-and-boundaries.js';
import handleBrickAndBoundariesCollision from './collisions/brick-and-boundaries.js';
import handleBrickAndBrickCollision from './collisions/brick-and-brick.js';



// GameRound class
class Game {

  /*
   * Accepts a canvas context and the canvas element
  */
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.running = false;
    this.init();
    this.render();
    document.addEventListener("keydown", (e) => {
      if (e.key === 'Escape' && this.running) {
        this.stop();
        document.dispatchEvent(new CustomEvent('gamepaused'));
      }
    });
  }


  /*
   * Initializes the game by resetting the stats and loading the first level
  */
  init() {
    this.stats = new Stats({
      renderedBricks: 0,
      level: 1,
      timer: 0,
      timerFormatted: '0:00',
      score: 0,
      renderedPowerups: 0,
      totalBricksDestroyed: 0,
      totalPowerupsCollected: 0,
    });
    this.powerupSettings = {
      spawnRate: 6,
      spawnLimit: 10,
    }
    this.initLevel(levels.find(l => l.level === this.stats.level));
  }


  /*
   * Accepts a level object
   * Initializes the level by creating the bricks, the ball, and the paddle
  */
  initLevel(level) {

    // Reset the level-specific stats
    this.stats.renderedBricks = 0;
    this.stats.renderedPowerups = 0;
    this.bricks = [];
    this.movableBricks = [];
    this.powerups = [];

    // Get the map grid
    const cellWidth = this.canvas.width / level.mapColumns;
    const cellHeight = this.canvas.height / level.mapRows;
    const mapGrid =  level.map.map((_, index) => {
      const column = index % level.mapColumns;
      const row = Math.floor(index / level.mapColumns);
      return {
        x: column * cellWidth,
        y: row * cellHeight,
        width: cellWidth,
        height: cellHeight
      }
    });

    // Create the objects from the level map
    const brickSpacing = 6;
    const brickWidth = cellWidth - brickSpacing;
    const brickHeight = cellHeight - brickSpacing;
    level.map.forEach((brickType, index) => {

      // Empty space
      if (brickType === 0) {
        return;
      }

      // The ball
      if (brickType === 9) {
        const ballRadius = (Math.min(brickWidth, brickHeight) / 2) - (brickSpacing / 2);
        const x = mapGrid[index].x + (cellWidth / 2) - (ballRadius / 2);
        const y = mapGrid[index].y + (cellHeight / 2) - (ballRadius / 2);
        this.ball = new Ball(x, y, ballRadius);
      }

      // Regular bricks
      else {
        const x = mapGrid[index].x + (brickSpacing / 2);
        const y = mapGrid[index].y + (brickSpacing / 2);
        const health = brickType === 2 ? 2 : 1;
        const color = getRandomHexColor();
        const xVel = brickType === 3 ? Brick.baseSpeed : brickType === 4 ? -Brick.baseSpeed : 0;
        const yVel = brickType === 5 ? Brick.baseSpeed : brickType === 6 ? -Brick.baseSpeed : 0;
        const brick = new Brick(x, y, brickWidth, brickHeight, health, color, xVel, yVel);
        this.bricks.push(brick);
        if (xVel !== 0 || yVel !== 0) {
          this.movableBricks.push(brick);
        }
      }

    });

    // Update properties
    this.stats.renderedBricks = this.bricks.length;

    // Create the paddle
    const paddleWidth = cellWidth * 2;
    const paddleHeight = cellHeight / 2;
    const paddleX = (this.canvas.width - paddleWidth) / 2;
    const paddleY = this.canvas.height - cellHeight;
    this.paddle = new Paddle(paddleX, paddleY, paddleWidth, paddleHeight);

  }


  /*
   * Spawns a random powerup somewhere random on the canvas
  */
  spawnPowerup() {
    if (this.powerups.length >= this.powerupSettings.spawnLimit) {
      return;
    }
    const powerup = powerups[Math.floor(Math.random() * powerups.length)];
    const x = Math.random() * this.canvas.width;
    const y = Math.random() * this.paddle.y;
    const radius = this.ball.radius;
    const color = powerup.color;
    const symbol = powerup.symbol;
    const type = powerup.id;
    this.powerups.push(new Powerup(x, y, radius, color, symbol, type));
    this.stats.renderedPowerups += 1;
  }


  /*
   * Start the game loop
  */
  start() {
    if (this.running) {
      return;
    }
    this.paddle.enableControls();
    this.running = true;
    this.lastFrameTime = performance.now();
    requestAnimationFrame(() => {
      loop(this);
    });
    this.counter = setInterval(() => {
      this.stats.timer += 1;
      this.stats.timerFormatted = secondsToMSS(this.stats.timer);
    }, 1000);
    this.powerupSpawner = setInterval(() => {
      this.spawnPowerup();
    }, this.powerupSettings.spawnRate * 1000);
  }


  /*
   * Stop the game loop
  */
  stop() {
    if (!this.running) {
      return;
    }
    this.paddle.disableControls();
    this.running = false;
    clearInterval(this.counter);
    clearInterval(this.powerupSpawner);
  }


  /*
   * Logic for when the level is failed
  */
  handleLevelFailed() {
    this.stop();
    document.dispatchEvent(new CustomEvent('gameover', { 
      detail: {
        stats: this.stats.getGameoverStats(),
        score: this.stats.score,
      },
    }));
  }


  /*
   * Logic for when the level is completed
  */
  handleLevelCompleted() {
    this.stop();
    const nextLevel = levels.find(l => l.level === this.stats.level + 1);
    if (!nextLevel) {
      document.dispatchEvent(new CustomEvent('gamecompleted', { 
        detail: {
          stats: this.stats.getGameoverStats(),
          score: this.stats.score,
        },
      }));
    }
    else {
      this.stats.level += 1;
      setTimeout(() => {
        this.initLevel(nextLevel);
        setTimeout(() => {
          this.render();
          setTimeout(() => {
            this.start();
          }, 1000);
        }, 1000);
      }, 500);
    }
  }


  /*
   * Update the game state
  */
  update() {

    // Calculate the time since the last frame
    const currentFrameTime = performance.now();
    const deltaTime = (currentFrameTime - this.lastFrameTime) / 1000;
    this.lastFrameTime = currentFrameTime;
    
    // Update the moveable objects
    this.ball.update(deltaTime);
    this.paddle.update(deltaTime);
    this.movableBricks.forEach(brick => {
      brick.update(deltaTime);
    });

    // Check for collisions
    handlePaddleAndBoundariesCollision(this.paddle, this.canvas);
    handleBallAndBoundariesCollision(this.ball, this.canvas);
    handleBallAndPaddleCollision(this.ball, this.paddle);
    handleBrickAndBoundariesCollision(this.movableBricks, this.canvas);
    handleBrickAndBrickCollision(this.movableBricks, this.bricks);
    this.powerups = handleBallAndPowerupCollision(this.ball, this.powerups, this.paddle, this.powerupSettings);
    this.bricks = handleBallAndBrickCollision(this.ball, this.bricks, this.stats);

    // Update the stats
    this.stats.update(deltaTime);

    // Handle lose conditions
    if (this.ball.y + this.ball.radius > this.canvas.height) {
      this.handleLevelFailed();
    }

    // Handle win conditions
    if (this.bricks.length === 0) {
      this.handleLevelCompleted();
    }

  }
  

  /*
   * Render the game objects
  */
  render() {
    this.clearCanvas();
    this.bricks.forEach(brick => {
      brick.render(this.ctx);
    });
    this.powerups.forEach(powerup => {
      powerup.render(this.ctx);
    });
    this.ball.render(this.ctx);
    this.paddle.render(this.ctx);
    this.stats.render(this.ctx);
  }


  /* 
   * Clear the canvas
  */
  clearCanvas() {
    this.ctx.fillStyle = "#202020";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

}



/*
 * Accepts a game instance
*/
function loop(game) {
  if (!game.running) {
    return;
  }
  game.update();
  game.render();
  requestAnimationFrame(() => {
    loop(game);
  });
}



// Exports
export default Game;