export interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Generate an array of @numOfColors RGB color strings between two fixed colors
 */
export function generateColors(
  numOfColors: number,
  startColor: RGB,
  endColor: RGB
): string[] {
  function isOutOfBounds(color: RGB): boolean {
    return Object.values(color).some((n) => n < 0 || n > 255);
  }
  if (numOfColors < 1) {
    throw new Error('The number of colors must be at least 1.');
  }
  if (isOutOfBounds(startColor) || isOutOfBounds(endColor)) {
    throw new Error('Invalid RGB value given.');
  }
  if (numOfColors === 1)
    return [`rgb(${startColor.r},${startColor.g},${startColor.b})`];

  const colors: string[] = [];
  const rStep = (endColor.r - startColor.r) / (numOfColors - 1);
  const gStep = (endColor.g - startColor.g) / (numOfColors - 1);
  const bStep = (endColor.b - startColor.b) / (numOfColors - 1);

  let r: number;
  let g: number;
  let b: number;

  for (let i = 0; i < numOfColors; i++) {
    r = startColor.r + i * rStep;
    g = startColor.g + i * gStep;
    b = startColor.b + i * bStep;
    colors.push(`rgb(${r},${g},${b})`);
  }
  return colors;
}
