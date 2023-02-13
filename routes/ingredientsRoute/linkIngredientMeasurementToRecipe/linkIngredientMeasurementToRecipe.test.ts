import { linkIngredientMeasurementToRecipe } from "./linkIngredientMeasurementToRecipe";
import { prismaMock } from "../../../singleton";
import { recipeIngredients } from "@prisma/client";

describe("linkIngredientMeasurementToRecipe", () => {
	const mockRecipeIngredients: recipeIngredients = {
		recipeIngredientID: 1,
		recipeID: 1,
		ingredientMeasurementID: 1,
	};

	beforeEach(() => {
		prismaMock.recipeIngredients.create.mockResolvedValue(
			mockRecipeIngredients,
		);
	});

	it("should add add a new link between an Ingredient Measurement and a recipe", async () => {
		const newRecipeIngredient = await linkIngredientMeasurementToRecipe(1, 1);
		expect(newRecipeIngredient).toStrictEqual(mockRecipeIngredients);
	});
});
