import { getAllCountries } from "./getAllCountries";

describe("getAllCountries", () => {
  it("successful circumstances", async () => {
    const allCountries = await getAllCountries();

    expect(Array.isArray(allCountries)).toBe(true);
    expect(typeof allCountries[0]).toBe("object");
    expect(typeof allCountries[0].countryID).toBe("number");
    expect(typeof allCountries[0].country).toBe("string");
  });
});
