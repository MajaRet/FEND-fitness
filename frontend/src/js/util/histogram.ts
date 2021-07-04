export interface NameValuePair {
  name: string;
  value: number;
}

/**
 * Compute a histogram for the entries of the input list.
 *
 * @param {[String]} l A list of strings containing the values for which a
 *                     histogram is computed.
 *
 * @returns            An object with the list elements as properties and the
 *                     list element/number of occurrences pair as properties.
 */
export function histogram(elements: string[]): NameValuePair[] {
  const histogram = new Map<string, NameValuePair>();
  let existingNameValuePair;
  let updatedNameValuePair;
  elements.forEach((element) => {
    existingNameValuePair = histogram.get(element);
    updatedNameValuePair = existingNameValuePair
      ? { ...existingNameValuePair, value: existingNameValuePair.value + 1 }
      : { name: element, value: 1 };
    histogram.set(element, updatedNameValuePair);
  });
  return Array.from(histogram.values());
}

/**
 * Compute the element that occurs in the input list most often.
 *
 * @param {[String]} l
 * @returns the element occurring most often, or @null for an empty input list.
 *          If more than one element occurs the most often, the ifrst is chosen
 */
export function majorityValue(elements: string[]): string | null {
  if (elements.length === 0) return null;
  const histo = histogram(elements);
  return histo.reduce((acc, e) => (acc.value < e.value ? e : acc), histo[0])
    .name;
}
