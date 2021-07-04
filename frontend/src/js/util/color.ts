export interface RGB {
  r: number;
  g: number;
  b: number;
}

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
export function generateColors(number: number, startColor: RGB, endColor: RGB) {
  function outOfBounds(color: RGB): boolean {
    return Object.values(color).some((n) => n < 0 || n > 255);
  }
  if (outOfBounds(startColor) || outOfBounds(endColor)) {
    throw new Error('Invalid RGB value given.');
  }
  if (number <= 1)
    return [`rgb(${startColor.r},${startColor.g},${startColor.b})`];

  const colors: string[] = [];
  const rStep = (endColor.r - startColor.r) / (number - 1);
  const gStep = (endColor.g - startColor.g) / (number - 1);
  const bStep = (endColor.b - startColor.b) / (number - 1);

  let r: number;
  let g: number;
  let b: number;

  for (let i = 0; i < number; i++) {
    r = startColor.r + i * rStep;
    g = startColor.g + i * gStep;
    b = startColor.b + i * bStep;
    colors.push(`rgb(${r},${g},${b})`);
  }
  return colors;
}
