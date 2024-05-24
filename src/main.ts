import './style.css';
import { Color } from './types/Color';

document.addEventListener('DOMContentLoaded', function () {
  // Create the SVG element
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('id', 'gameArea');
  svg.setAttribute('viewBox', '0 0 128 128');

  // Append the SVG element to the body
  document.body.appendChild(svg);

  // Create the parent group for the level
  const level = document.createElementNS(svgNS, 'g');
  level.setAttribute('id', 'level');
  svg.appendChild(level);

  // Function to create the player sprite using path data
  function createSprite(
    inputString: string,
    x: number,
    y: number,
    color: Color
  ) {
    const svgNS = 'http://www.w3.org/2000/svg';

    // Remove all non-binary characters
    const regex = /[^01]/g;
    inputString = inputString.replace(regex, '');

    // Validate input string length (should be 64 characters for an 8x8 image)
    if (inputString.length !== 64) {
      console.error('Input string must be exactly 64 characters (8x8 image).');
      return null;
    }

    // Initialize an empty path data string
    let pathData = '';

    // Loop through each character in the input string
    for (let i = 0; i < inputString.length; i++) {
      const char = inputString.charAt(i);
      const x = i % 8; // Column index (0 to 7)
      const y = Math.floor(i / 8); // Row index (0 to 7)

      if (char === '1') {
        // Add a 1x1 pixel cube at (x, y)
        pathData += `M${x},${y}h1v1h-1z `;
      }
      // For "0", leave it empty (no path data)
    }

    // Create the SVG path element
    const path = document.createElementNS(svgNS, 'path');

    path.setAttribute('d', pathData);
    path.setAttribute('fill', color);
    path.setAttribute('transform', `translate(${x * 8}, ${y * 8})`);

    level.appendChild(path);

    return path;
  }

  // Player sprite definition in a single string with backticks
  const playerSprite = `
  11000011
  11111111
  01111110
  01111110
  01011010
  01111110
  01100110
  00111100
    `;

  // Create the player at position (0, 0) with the color blue
  let player = createSprite(playerSprite, 0, 0, '#df973b');

  // Function to move the player
  function movePlayer(dx: number, dy: number) {
    if (player) {
      let match;
      let currentX;
      let currentY;
      let newX;
      let newY;

      let transform = player.getAttribute('transform');
      if (transform) {
        match = /translate\((\d+), (\d+)\)/.exec(transform);
      }

      if (match) {
        currentX = parseInt(match[1]);
        currentY = parseInt(match[2]);
      }

      if (currentX !== undefined && currentY !== undefined) {
        newX = currentX + dx * 8;
        newY = currentY + dy * 8;
      }

      if (newX !== undefined && newY !== undefined) {
        // Stay within the boundaries
        if (newX >= 128 || newX < 0 || newY >= 128 || newY < 0) {
          return;
        }
      }

      player.setAttribute('transform', `translate(${newX}, ${newY})`);
    }
  }

  // Event listener for keyboard input
  document.addEventListener('keydown', function (event) {
    switch (event.key) {
      case 'ArrowUp':
        movePlayer(0, -1);
        break;
      case 'ArrowDown':
        movePlayer(0, 1);
        break;
      case 'ArrowLeft':
        movePlayer(-1, 0);
        break;
      case 'ArrowRight':
        movePlayer(1, 0);
        break;
    }
  });
});
