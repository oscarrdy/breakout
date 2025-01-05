// Imports
import FPS from './fps.js';



// Stats class
class Stats {
  
  /*
   * Accepts an object containing the stats
  */
  constructor(stats) {
    Object.assign(this, stats);
    this.FPS = new FPS();
  }


  /*
   * Returns the relevant stats for the gameover screen
  */
  getGameoverStats() {
    return [
      { label: 'Bricks Destroyed:', value: this.totalBricksDestroyed },
      { label: 'Level Reached:', value: this.level },
      { label: 'Time Passed:', value: this.timerFormatted },
      { label: 'Total Score:', value: this.score },
    ];
  }


  /*
   * Returns the relevant stats for the display
  */
  getDisplayStats() {
    return [
      { label: 'Bricks', value: this.renderedBricks },
      { label: 'Level', value: this.level },
      { label: 'Timer', value: this.timerFormatted },
      { label: 'Score', value: this.score },
      { label: 'Frames', value: this.FPS.getFPS() + " fps" }
    ];
  }


  /*
   * Accepts the time since the last frame
  */
  update(deltaTime) {
    this.FPS.track(deltaTime);
  }


  /*
   * Accepts the canvas rendering context
  */
  render(ctx) {

    // Text settings
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // The stats positioning
    const startY = 40;
    const spacingBetweenLines = 24;
    const spacingBetweenStats = 200;

    // The stats content
    const statsArray = this.getDisplayStats();

    // Helper constants
    const centerX = ctx.canvas.width / 2;
    const totalWidth = (statsArray.length - 1) * spacingBetweenStats;
    const startX = centerX - totalWidth / 2;

    // Render the stats
    statsArray.forEach((stat, index) => {
      const x = startX + index * spacingBetweenStats;
      ctx.font = '16px Comic Sans MS';
      ctx.fillText(stat.label, x, startY);
      ctx.font = '24px Comic Sans MS';
      ctx.fillText(stat.value, x, startY + spacingBetweenLines);
    });

  }

}



// Exports
export default Stats;