const  Rule = require("../models/Rule"); 

describe("Delete", () => {
  it("Must delete a registered rule. ", () => {
    let delete_rule = Rule.delete(6);
    expect(delete_rule).toBe(true);

  });
});