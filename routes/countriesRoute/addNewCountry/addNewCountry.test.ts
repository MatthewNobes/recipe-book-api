import { addNewCountry } from "./addNewCountry";
import { prismaMock } from "../../../singleton";
import { countries } from "@prisma/client";

describe("addNewCountry", () => {
	const mockCountry: countries = {
		countryID: 1,
		country: "Test 1",
	};

	beforeEach(() => {
		prismaMock.countries.create.mockResolvedValue(mockCountry);
	});

	it("should add the new country Test 1", async () => {
		const requestedCountries = await addNewCountry("Test 1");
		expect(requestedCountries).toEqual({
			countryID: 1,
			country: "Test 1",
		});
	});

	it("should return undefined if blank is passed in", async () => {
		const requestedCountries = await addNewCountry("");
		expect(requestedCountries).toBeUndefined();
	});
});
