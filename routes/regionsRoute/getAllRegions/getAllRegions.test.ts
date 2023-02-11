import { getAllRegions } from "./getAllRegions";
import { prismaMock } from "../../../singleton";
import { regions } from "@prisma/client";

describe("getAllCategories", () => {
	const mockRegionData: regions[] = [
		{
			regionID: 1,
			region: "Test 1",
		},
		{
			regionID: 2,
			region: "Test 2",
		},
	];

	beforeEach(() => {
		prismaMock.regions.findMany.mockResolvedValue(mockRegionData);
	});

	it("should return the mocked regions", async () => {
		const requestedRegions = await getAllRegions();
		expect(requestedRegions).toEqual(mockRegionData);
	});
});
