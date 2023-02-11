import { ingredients } from "@prisma/client";
import prisma from "../../../client";

/**
 * Used to add a new ingredient
 * @param ingredientName The name of the required ingredient
 * @param ingredientDescription The description of the ingredient (optional)
 * @param ingredientInfoURL The URL for information on the ingredient (optional)
 * @returns Promise<Ingredients | undefined>
 */
export const addNewIngredient = async (
	ingredientName: string,
	ingredientDescription?: string,
	ingredientInfoURL?: string,
): Promise<ingredients | undefined> => {
	if (ingredientName === "") {
		return undefined;
	}
	const newIngredient = await prisma.ingredients.create({
		data: {
			ingredient: ingredientName,
			ingredientDescription: ingredientDescription,
			ingredientInfoURL: ingredientInfoURL,
		},
	});

	return newIngredient;
};
