/**
 * Compute a histogram for the entries of the input list.
 *
 * @param {[String]} l A list of strings containing the values for which a
 *                     histogram is computed.
 *
 * @returns            An object with the list elements as properties and the
 *                     list element/number of occurrences pair as properties.
 */
export function histogram(l) {
  const histogram = {};
  l.forEach((e) => {
    histogram[e] = {
      name: e,
      value: histogram[e] ? histogram[e].value + 1 : 1,
    };
  });
  return histogram;
}

/**
 * Compute the element that occurs in the input list most often.
 *
 * @param {[String]} l
 * @returns the element occurring most often, or @null for an empty input list.
 *          If more than one element occurs the most often, the ifrst is chosen
 */
export function majorityValue(l) {
  if (l.length === 0) return null;
  const histo = Object.values(histogram(l));
  return histo.reduce((acc, e) => (acc.value < e.value ? e : acc), histo[0])
    .name;
}
