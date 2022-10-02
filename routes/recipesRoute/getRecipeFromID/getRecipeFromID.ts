import { PrismaClient } from "@prisma/client";
import { getRecipeIngredientsFromID } from "./getRecipeIngredientsFromID/getRecipeIngredientsFromID";

const prisma = new PrismaClient();

interface recipeObject {
  recipeID: any;
  recipeName: any;
  recipeDecsription: any;
  recipePrepTime: any;
  recipeCookTime: any;
  servingNumber: any;
  recipeDifficultyRating?: any;
  recipeSource?: any;
  ingredients?: any;
}

export const getRecipeFromID = async (requestedRecipeID: number) => {
  const recipe = await prisma.recipe.findFirst({
    where: { recipeID: requestedRecipeID },
  });

  if (recipe) {
    const recipeObj: recipeObject = recipe;
    const recipeIngredientsArray = await getRecipeIngredientsFromID(
      recipeObj.recipeID
    );

    recipeObj.ingredients = recipeIngredientsArray;
    return recipeObj;
  }

  return null;
};
