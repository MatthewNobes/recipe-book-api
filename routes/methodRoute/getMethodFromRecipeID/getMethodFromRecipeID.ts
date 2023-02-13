import prisma from "../../../client";
import { recipeSteps } from "@prisma/client";

/**
 * Gets a full method for a recipe, from its recipe ID.
 * @param requestedRecipeID The requested recipe ID
 * @returns Promise<RecipeSteps[] | undefined> Either an array of recipe objects or undefined if no records can be found
 */
export const getMethodFromRecipeID = async (
	requestedRecipeID: number,
): Promise<recipeSteps[] | undefined> => {
	const recipeSteps = await prisma.recipeSteps.findMany({
		where: { recipeID: requestedRecipeID },
	});

	if (recipeSteps.length > 1 && recipeSteps[0].recipeID === requestedRecipeID) {
		return recipeSteps;
	} else {
		return undefined;
	}
};
