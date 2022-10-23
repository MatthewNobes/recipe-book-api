import { PrismaClient } from "@prisma/client";
import { getRecipeIngredientsFromID } from "./getRecipeIngredientsFromID/getRecipeIngredientsFromID";

const prisma = new PrismaClient();

interface recipeObject {
  RecipeID: any;
  RecipeName: any;
  RecipeDecsription: any;
  RecipePrepTime: any;
  RecipeCookTime: any;
  ServingNumber: any;
  RecipeDifficultyRating?: any;
  RecipeSource?: any;
  Ingredients?: any;
}

export const getRecipeFromID = async (requestedRecipeID: number) => {
  const recipe = await prisma.recipes.findFirst({
    where: { RecipeID: requestedRecipeID },
  });

  if (recipe) {
    const recipeObj: recipeObject = recipe;
    const recipeIngredientsArray = await getRecipeIngredientsFromID(
      recipeObj.RecipeID
    );

    recipeObj.Ingredients = recipeIngredientsArray;
    return recipeObj;
  }

  return null;
};
