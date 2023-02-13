import { recipeIngredients } from "@prisma/client";
import prisma from "../../../client";

export const linkIngredientMeasurementToRecipe = async (
	recipeID: number,
	ingredientMeasurementID: number,
): Promise<recipeIngredients | undefined> => {
	const newLinkedIngredientMeasurement = await prisma.recipeIngredients.create({
		data: {
			recipeID: recipeID,
			ingredientMeasurementID: ingredientMeasurementID,
		},
	});

	return newLinkedIngredientMeasurement;
};
