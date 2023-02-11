import request from "supertest";
import app from "../../app";
import { prismaMock } from "../../singleton";
import { regions } from "@prisma/client";

describe("GET /api/regions", () => {
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

	it("should return the mocked regions array", async () => {
		const response = await request(app).get("/api/regions");

		expect(response.statusCode).toBe(200);
		expect(typeof response.body).toBe("object");
		expect(response.body).toStrictEqual({ data: mockRegionData });
	});
});
