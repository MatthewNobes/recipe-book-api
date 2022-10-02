import { PrismaClient } from "@prisma/client";
import { getRecipeIngredientsFromID } from "./getRecipeIngredientsFromID/getRecipeIngredientsFromID.mjs";

const prisma = new PrismaClient();

export const getRecipeFromID = async (requestedRecipeID) => {
  const recipe = await prisma.recipe.findFirst({
    where: { recipeID: requestedRecipeID },
  });

  const recipeIngredientsArray = await getRecipeIngredientsFromID(
    recipe.recipeID
  );

  recipe.ingredients = recipeIngredientsArray;
  return recipe;
};
