import request from "supertest";
import app from "../../app";
import { prismaMock } from "../../singleton";
import { categories } from "@prisma/client";

describe("GET /api/categories", () => {
	const mockCategoryData: categories[] = [
		{
			categoryID: 1,
			category: "Test 1",
		},
		{
			categoryID: 2,
			category: "Test 2",
		},
	];

	beforeEach(() => {
		prismaMock.categories.findMany.mockResolvedValue(mockCategoryData);
	});

	it("should return the mocked categories array", async () => {
		const response = await request(app).get("/api/categories");

		expect(response.statusCode).toBe(200);
		expect(typeof response.body).toBe("object");
		expect(response.body).toStrictEqual({ data: mockCategoryData });
	});
});
