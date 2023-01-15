import { getAllRegions } from "./getAllRegions";
import { prismaMock } from "../../../singleton";
import { Regions } from "@prisma/client";

describe("getAllCategories", () => {
	const mockRegionData: Regions[] = [
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
