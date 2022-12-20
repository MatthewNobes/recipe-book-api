import { getAllCountries } from "./getAllCountries";
import { prismaMock } from "../../../singleton";
import { Countries } from "@prisma/client";

describe("getAllCountries", () => {
	const mockCountryData: Countries[] = [
		{
			countryID: 1,
			country: "Test 1",
		},
		{
			countryID: 2,
			country: "Test 2",
		},
	];

	beforeEach(() => {
		prismaMock.countries.findMany.mockResolvedValue(mockCountryData);
	});

	it("should return the mocked countries", async () => {
		const requestedCountries = await getAllCountries();
		expect(requestedCountries).toEqual([
			{
				countryID: 1,
				country: "Test 1",
			},
			{
				countryID: 2,
				country: "Test 2",
			},
		]);
	});
});
