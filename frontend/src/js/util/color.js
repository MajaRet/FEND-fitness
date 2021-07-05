/**
 * Generate an array of @number colors between two fixed colors
 *
 * @param {Number} number     The number of colors to generate
 * @param {Object} startColor The starting color, given as an object with
 *                            r, g and b properties.
 * @param {Object} endColor   The ending color.
 * @returns {[String]}         An array of @number colors between @startColor
 *                            and @endColor (inclusive). If @number is 1,
 *                            then the array contains only @startColor
 */
function generateColors(number, startColor, endColor) {
  if (number <= 1)
    return [`rgb(${startColor.r},${startColor.g},${startColor.b})`];

  const colors = [];
  const rStep = (endColor.r - startColor.r) / (number - 1);
  const gStep = (endColor.g - startColor.g) / (number - 1);
  const bStep = (endColor.b - startColor.b) / (number - 1);

  let r;
  let g;
  let b;
  for (let i = 0; i < number; i++) {
    r = startColor.r + i * rStep;
    g = startColor.g + i * gStep;
    b = startColor.b + i * bStep;
    colors.push(`rgb(${r},${g},${b})`);
  }
  return colors;
}

export default generateColors;
