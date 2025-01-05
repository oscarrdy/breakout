# Breakout Game

An Atari Breakout-inspired game featuring multiple power-ups and levels.

## Project Architecture

This project uses the **Model-View-Controller (MVC)** architecture for better scalability and maintainability:
- **View**: All interface-related logic can be found in `index.js`.
- **Model**: All models and their logic are located in the `models` folder.
- **Controller**: Central game logic such as the game loop, and start/stop methods, can be found in `game.js`.

## Power-Ups

- **`<>`**: Increases the paddle's width.
- **`><`**: Decreases the paddle's width.
- **`+`**: Increases the power-up spawn rate and spawn limit.
- **`v+`**: Increases the ball's velocity.
- **`v-`**: Decreases the ball's velocity.
- **`💥`**: Makes the ball explosive.
- **`🗑️`**: Clears all active power-ups.

## Levels

1. **Level 1**: Features the classic Atari Breakout layout.
2. **Level 2**: Introduces armored bricks that require multiple hits to break.
3. **Level 3**: Features even more armored bricks.
4. **Level 4**: Introduces moving bricks that require better aim to hit.
5. **Level 5**: Features even more moving bricks for increased difficulty.

## Notes

- A list of planned future features can be found in `todo.txt`.
