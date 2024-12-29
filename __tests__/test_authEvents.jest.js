const authEvents = require("../src/authEvents")

describe("authEvents", () => {
  test("should handle setPassword and authorize events correctly", () => {
    const events = [
      ["setPassword", "cAr1"],
      ["authorize", "223691457"], // hash of "cAr1"
      ["authorize", "303580761"], // hash of "cAr1a"
      ["authorize", "100"], // invalid hash
      ["setPassword", "d"],
      ["authorize", "100"], // hash of "d"
    ]
    const expected = [1, 1, 0, 1]
    expect(authEvents(events)).toEqual(expected)
  })

  test("should return correct results for multiple setPassword and authorize events", () => {
    const events = [
      ["setPassword", "000A"],
      ["authorize", "108738450"],
      ["authorize", "108738449"],
      ["authorize", "244736787"],
    ]
    const expected = [0, 1, 1]
    expect(authEvents(events)).toEqual(expected)
  })

  test("should handle edge cases with short passwords", () => {
    const events = [
      ["setPassword", "a"],
      ["authorize", "97"], // hash of "a"
      ["authorize", "12804"], // hash of "aa"
      ["authorize", "99999"], // invalid hash
    ]
    const expected = [1, 1, 0]
    expect(authEvents(events)).toEqual(expected)
  })
})
