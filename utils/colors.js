// Constants
const hexCharacters = '0123456789ABCDEF';



/*
 * Returns a random hexadecimal number (string)
*/
function getRandomHexColor() {
  let hexColor = '#';
  for (let i = 0; i < 6; i++) {
    hexColor += hexCharacters[Math.floor(Math.random() * hexCharacters.length)];
  }
  return hexColor;
}



/*
 * Accepts a hexadecimal value (string)
 * Returns the inverted hexadecimal value (string)
*/
function invertHexColor(hex) {
  
  // Prepare the input
  hex = hex.trim();
  hex = hex.startsWith('#') ? hex.slice(1) : hex;
  hex = hex.length === 3 ? hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] : hex;

  // Validate the input
  if (hex.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(hex)) {
    throw new Error('Invalid HEX color.');
  }

  // Invert the color
  const inverted = (0xFFFFFF ^ parseInt(hex, 16)).toString(16).padStart(6, '0');

  // Return the result
  return "#" + inverted;

}



// Exports
export { 
  getRandomHexColor,
  invertHexColor,
}

