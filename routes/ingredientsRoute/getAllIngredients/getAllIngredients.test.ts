import { getAllIngredients } from "./getAllIngredients";
import { prismaMock } from "../../../singleton";
import { ingredients } from "@prisma/client";

describe("getAllIngredients", () => {
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

	it("should return the mocked ingredients", async () => {
		const requestedIngredients = await getAllIngredients();
		expect(requestedIngredients).toEqual(mockIngredientsData);
	});
});
