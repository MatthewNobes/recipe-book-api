import { linkIngredientMeasurementToRecipe } from "./linkIngredientMeasurementToRecipe";
import { prismaMock } from "../../../singleton";
import { RecipeIngredients } from "@prisma/client";

describe("linkIngredientMeasurementToRecipe", () => {
	const mockRecipeIngredients: RecipeIngredients = {
		recipeIngredientsID: 1,
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
