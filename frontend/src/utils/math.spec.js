it("should be true", () => {
  expect(true).toBe(true);
});

function add(n, m) {
  return n + m;
}

it("should add two numbers", () => {
  expect(add(2, 3)).toBe(5);
  expect(add(-4, 10)).toBe(6);
});
