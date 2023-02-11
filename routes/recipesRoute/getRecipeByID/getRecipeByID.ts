import { recipes } from "@prisma/client";
import prisma from "../../../client";

export const getRecipeByID = async (
	requestedRecipeID: number,
): Promise<recipes | undefined> => {
	const recipe = await prisma.recipes.findFirst({
		where: { recipeID: requestedRecipeID },
	});

	if (recipe && recipe.recipeID === requestedRecipeID) {
		return recipe;
	} else {
		return undefined;
	}
};
