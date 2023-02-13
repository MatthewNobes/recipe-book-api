import { addNewIngredient } from "./addNewIngredient";
import { prismaMock } from "../../../singleton";
import { ingredients } from "@prisma/client";

describe("addNewIngredient", () => {
	const mockIngredient: ingredients = {
		ingredientID: 1,
		ingredient: "Test 1",
		ingredientDescription: "Test Description 1",
		ingredientInfoURL: "www.google.com",
	};

	beforeEach(() => {
		prismaMock.ingredients.create.mockResolvedValue(mockIngredient);
	});

	it("should add the new ingredient Test 1", async () => {
		const newIngredient = await addNewIngredient(
			"Test 1",
			"Test Description 1",
			"www.google.com",
		);
		expect(newIngredient).toStrictEqual(mockIngredient);
	});

	it("should return undefined if blank is passed in as the ingredient name", async () => {
		const newIngredient = await addNewIngredient(
			"",
			"Test Description 1",
			"www.google.com",
		);
		expect(newIngredient).toBeUndefined();
	});
});
