import request from "supertest";
import app from "../../app";
import { prismaMock } from "../../singleton";
import { Ingredients } from "@prisma/client";

describe("GET /api/ingredients/ingredients", () => {
	const mockIngredientsData: Ingredients[] = [
		{
			ingredientID: 1,
			ingredientName: "Test 1",
			ingredientDescription: "Test Description 1",
			ingredientInfoURL: "www.google.com",
		},
		{
			ingredientID: 2,
			ingredientName: "Test 2",
			ingredientDescription: "Test Description 2",
			ingredientInfoURL: "www.google.com",
		},
	];

	beforeEach(() => {
		prismaMock.ingredients.findMany.mockResolvedValue(mockIngredientsData);
	});

	it("should return the mocked ingredients array", async () => {
		const response = await request(app).get("/api/ingredients/ingredients");

		expect(response.statusCode).toBe(200);
		expect(typeof response.body).toBe("object");
		expect(response.body).toStrictEqual({ data: mockIngredientsData });
		expect(Array.isArray(response.body.data)).toBe(true);
		expect(response.body.data).toStrictEqual(mockIngredientsData);
	});
});

describe("POST /api/ingredients/add/:ingredientName/:ingredientDescription/:ingredientInfoURL", () => {
	const mockIngredient: Ingredients = {
		ingredientID: 1,
		ingredientName: "Test 1",
		ingredientDescription: "Test Description 1",
		ingredientInfoURL: "www.google.com",
	};

	beforeEach(() => {
		prismaMock.ingredients.create.mockResolvedValue(mockIngredient);
	});
	describe("successful circumstances", () => {
		it("should return the added ingredient Test 1", async () => {
			const ingredientName = mockIngredient.ingredientName;
			const ingredientDescription = mockIngredient.ingredientDescription;
			const ingredientInfoURL = mockIngredient.ingredientInfoURL;

			const response = await request(app).post(
				"/api/ingredients/add/" +
					ingredientName +
					"/" +
					ingredientDescription +
					"/" +
					ingredientInfoURL,
			);

			expect(response.statusCode).toBe(201);
			expect(response.body).toStrictEqual({ data: mockIngredient });
		});
	});

	describe("unsuccessful circumstances", () => {
		it("should return 404 as a lack of parameter will fail to find the route", async () => {
			const ingredientDescription = mockIngredient.ingredientDescription;
			const ingredientInfoURL = mockIngredient.ingredientInfoURL;

			const response = await request(app).post(
				"/api/ingredients/add//" +
					ingredientDescription +
					"/" +
					ingredientInfoURL,
			);
			expect(response.statusCode).toBe(404);
		});
	});
});
