import { getCountryByID } from "./getCountryByID";

describe("getCountryByID", () => {
  it("successful circumstances", async () => {
    const countryID = 1;
    const country = await getCountryByID(countryID);

    expect(typeof country).toBe("object");
  });
});
