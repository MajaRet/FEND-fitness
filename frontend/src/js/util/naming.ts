/**
 * Create displayed names in German from the English value names.
 */
const germanMap = new Map<string, string>();
germanMap.set('beginner', 'Anfänger');
germanMap.set('intermediate', 'fortgeschritten');
germanMap.set('hard', 'schwierig');
germanMap.set('cardio', 'Kardio');
germanMap.set('strength', 'Kraft');
germanMap.set('weightloss', 'Abnehmen');
germanMap.set('coordination', 'Koordination');

function display(str: string): string {
  return germanMap.get(str) || str;
}

export default display;
