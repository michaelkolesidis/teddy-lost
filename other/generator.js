function createPixelArtSVG(inputString, color, x, y) {
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

  return path;
}

// Example usage:
const inputString = `
  00111100
  01111110
  11011011
  11111111
  11000011
  10111101
  11000011
  01111110`;
const color = '#FF5733'; // Specify your desired color (e.g., hex code or color name)
const svgElement = createPixelArtSVG(inputString, color);

console.log(svgElement);
