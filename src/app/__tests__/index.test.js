const  Jest = require("../models/Jest"); 

describe("index", () => {
  it("Should sum two numbers", () => {
    const sum = Jest.sum(2,3);
    expect(sum).toBe(5);

  });
});