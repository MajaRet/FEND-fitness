import { inverse, subStr } from "./strings";

describe("inverse", () => {
  it("should return an inversed string", () => {
    expect(inverse("Basti")).toBe("itsaB");
    expect(inverse("1234")).toBe("4321");
  });

  it("should throw an error on no input", () => {
    expect(() => inverse("")).toThrow("No input given");
  });
});

describe("subStr", () => {
  it("should return a shorter version of a string", () => {
    expect(subStr("Basti", 3)).toBe("Bas");
    expect(subStr("Eric", 4)).toBe("Eric");
    expect(subStr("Lorem ipsum dolor", 7)).toBe("Lorem i");
  });
});
