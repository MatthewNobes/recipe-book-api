import request from "supertest";
import app from "../../app";
import { prismaMock } from "../../singleton";
import {
	ingredients,
	recipeIngredients,
	ingredientMeasurements,
} from "@prisma/client";

describe("GET /api/ingredients/ingredients", () => {
	const mockIngredientsData: ingredients[] = [
		{
			ingredientID: 1,
			ingredient: "Test 1",
			ingredientDescription: "Test Description 1",
			ingredientInfoURL: "www.google.com",
		},
		{
			ingredientID: 2,
			ingredient: "Test 2",
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
	const mockIngredient: ingredients = {
		ingredientID: 1,
		ingredient: "Hello",
		ingredientDescription: "Hello world",
		ingredientInfoURL: "encodedURLhere",
	};

	const mockIngredientMeasurement: ingredientMeasurements = {
		ingredientMeasurementID: 1,
		ingredientID: 1,
		measurementTypeID: 2,
		measurementSize: 23,
	};

	const mockRecipeIngredients: recipeIngredients = {
		recipeIngredientID: 1,
		recipeID: 1,
		ingredientMeasurementID: 1,
	};

	beforeEach(() => {
		prismaMock.ingredients.create.mockResolvedValue(mockIngredient);

		prismaMock.ingredientMeasurements.create.mockResolvedValue(
			mockIngredientMeasurement,
		);

		prismaMock.recipeIngredients.create.mockResolvedValue(
			mockRecipeIngredients,
		);
	});
	describe("successful circumstances", () => {
		it("should return the added ingredient Test 1", async () => {
			const ingredientName = mockIngredient.ingredient;
			const ingredientDescription = mockIngredient.ingredientDescription;
			const ingredientInfoURL = mockIngredient.ingredientInfoURL;
			const measurementTypeID = mockIngredientMeasurement.measurementTypeID;
			const measurementSize = mockIngredientMeasurement.measurementSize;
			const recipeID = mockRecipeIngredients.recipeID;

			const response = await request(app).post(
				"/api/ingredients/add/" +
					ingredientName +
					"/" +
					ingredientDescription +
					"/" +
					ingredientInfoURL +
					"/" +
					recipeID +
					"/" +
					measurementTypeID +
					"/" +
					measurementSize,
			);

			expect(response.statusCode).toBe(201);
			expect(response.body).toStrictEqual({
				data: {
					recipeIngredientID: mockRecipeIngredients.recipeIngredientID,
					ingredientDescription: mockIngredient.ingredientDescription,
					ingredientInfoURL: mockIngredient.ingredientInfoURL,
					ingredientName: mockIngredient.ingredient,
					measurementSize: mockIngredientMeasurement.measurementSize,
					measurementTypeID: mockIngredientMeasurement.measurementTypeID,
					recipeID: mockRecipeIngredients.recipeID,
				},
			});
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
