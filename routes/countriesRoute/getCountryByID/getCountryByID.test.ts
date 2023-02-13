import { getCountryByID } from "./getCountryByID";
import { prismaMock } from "../../../singleton";
import { countries } from "@prisma/client";

describe("getCountryByID", () => {
	const mockCountryData: countries = {
		countryID: 1,
		country: "Test 1",
	};

	beforeEach(() => {
		prismaMock.countries.findUnique.mockResolvedValue(mockCountryData);
	});

	it("should return the selected country out of the mocked countries", async () => {
		const requestedCountryID = 1;
		const requestedCountry = await getCountryByID(requestedCountryID);
		expect(requestedCountry).toEqual({
			countryID: 1,
			country: "Test 1",
		});
	});

	it("should return undefined when looking for a country that doesn't exist", async () => {
		const requestedCountryID = 1234;
		const requestedCountry = await getCountryByID(requestedCountryID);
		expect(requestedCountry).toBeUndefined();
	});
});
