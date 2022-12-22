import { Recipes } from "@prisma/client";
import prisma from "../../../client";

export const getRecipeByID = async (
	requestedRecipeID: number,
): Promise<Recipes | undefined> => {
	const recipe = await prisma.recipes.findFirst({
		where: { RecipeID: requestedRecipeID },
	});

	if (recipe && recipe.RecipeID === requestedRecipeID) {
		return recipe;
	} else {
		return undefined;
	}
};
