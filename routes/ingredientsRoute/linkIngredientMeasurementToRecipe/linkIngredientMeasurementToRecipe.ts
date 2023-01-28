import { RecipeIngredients } from "@prisma/client";
import prisma from "../../../client";

export const linkIngredientMeasurementToRecipe = async (
	recipeID: number,
	ingredientMeasurementID: number,
): Promise<RecipeIngredients | undefined> => {
	const newLinkedIngredientMeasurement = await prisma.recipeIngredients.create({
		data: {
			recipeID: recipeID,
			ingredientMeasurementID: ingredientMeasurementID,
		},
	});

	return newLinkedIngredientMeasurement;
};
