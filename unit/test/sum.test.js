const sum = require("../sum");

test("adds 1 + 2 to equal 3", function () {
  const resultSum = sum(1, 2)
  expect(result).toEqual(3)
})

test("add 1 + 2 not equal 2", function () {
  expect(sum(1,2)).not.toBe(2)
})