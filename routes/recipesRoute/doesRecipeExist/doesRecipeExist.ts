import { getRecipeByID } from "../getRecipeByID/getRecipeByID";

export const doesRecipeExist = async (recipeID: number): Promise<Boolean> => {
	const recipe = await getRecipeByID(recipeID);

	if (recipe) {
		return true;
	} else {
		return false;
	}
};
