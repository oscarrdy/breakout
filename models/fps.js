// FPS class
class FPS {
  
  /*
   * Constructor
  */
  constructor() {
    this.fps = 0;
    this.displayFps = 0;
    this.runningSum = 0;
    this.fpsHistory = [];
    this.smoothingFrames = 60;
    this.smoothingDisplay = 10;
    this.frameCounter = 0;
  }


  /*
   * Accepts the time since the last frame
  */
  track(deltaTime) {

    // Calculate the current FPS
    const currentFPS = 1 / deltaTime;

    // Update the rolling average
    this.fpsHistory.push(currentFPS);
    this.runningSum += currentFPS;
    if (this.fpsHistory.length > this.smoothingFrames) {
      this.runningSum -= this.fpsHistory.shift();
    }
    this.fps = this.runningSum / this.fpsHistory.length;

    // Update display FPS every N frames
    this.frameCounter++;
    if (this.frameCounter % this.smoothingDisplay === 0) {
      this.displayFps = this.fps;
    }

  }

  
  /*
   * Returns the current FPS as an integer
  */
  getFPS() {
    return Math.round(this.displayFps);
  }

}



// Exports
export default FPS;