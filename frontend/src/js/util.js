// Returns a histogram for the entries of the input list.
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

// Returns the value that occurs in the input list most often, or null
// for an empty list.
export function majorityValue(l) {
  if (l.length === 0) return null;
  const histo = Object.values(histogram(l));
  return histo.reduce((acc, e) => (acc.value < e.value ? e : acc), histo[0])
    .name;
}
