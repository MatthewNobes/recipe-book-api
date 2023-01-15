import request from "supertest";
import app from "../../app";
import { prismaMock } from "../../singleton";
import { Catagories } from "@prisma/client";

describe("GET /api/categories", () => {
	const mockCategoryData: Catagories[] = [
		{
			catagoryID: 1,
			catagory: "Test 1",
		},
		{
			catagoryID: 2,
			catagory: "Test 2",
		},
	];

	beforeEach(() => {
		prismaMock.catagories.findMany.mockResolvedValue(mockCategoryData);
	});

	it("should return the mocked categories array", async () => {
		const response = await request(app).get("/api/categories");

		expect(response.statusCode).toBe(200);
		expect(typeof response.body).toBe("object");
		expect(response.body).toStrictEqual({ data: mockCategoryData });
	});
});
