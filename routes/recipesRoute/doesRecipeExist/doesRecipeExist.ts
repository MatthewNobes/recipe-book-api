import { getRecipeByID } from "../getRecipeByID/getRecipeByID";

export const doesRecipeExist = async (recipeID: number): Promise<boolean> => {
	const recipe = await getRecipeByID(recipeID);

	if (recipe) {
		return true;
	} else {
		return false;
	}
};
