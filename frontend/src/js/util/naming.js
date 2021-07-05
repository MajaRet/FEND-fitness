// TODO Define in backend data structure instead?
/**
 * Create displayed names in German from the English value names.
 */
const displayGermanName = {
  beginner: 'Anfänger',
  intermediate: 'fortgeschritten',
  hard: 'schwierig',
  cardio: 'Kardio',
  strength: 'Kraft',
  weightloss: 'Abnehmen',
  coordination: 'Koordination',
};

function display(str) {
  return displayGermanName[str] || str;
}

export default display;
