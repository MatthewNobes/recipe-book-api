import { getRecipeFromID } from "../getRecipeFromID/getRecipeFromID";

export const doesRecipeExist = async (recipeID: number) => {
  const recipe = await getRecipeFromID(recipeID);

  if (recipe) {
    return true;
  } else {
    return false;
  }
};
