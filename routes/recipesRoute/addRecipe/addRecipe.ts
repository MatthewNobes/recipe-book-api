import { Recipes } from "@prisma/client";
import prisma from "../../../client";

export const addRecipe = async (
	recipeName: string,
	recipeDescription: string,
	servingNumber: number,
	recipeDifficultyRating?: number,
	recipePrepTime?: string,
	recipeCookTime?: string,
	recipeSource?: string,
	categoryID?: number,
	countryID?: number,
	regionID?: number,
): Promise<Recipes | undefined> => {
	if (
		recipeName === "" ||
		servingNumber === 0 ||
		!Number.isInteger(servingNumber)
	) {
		return undefined;
	}
	const newRecipe = await prisma.recipes.create({
		data: {
			RecipeName: recipeName,
			RecipeDecsription: recipeDescription,
			RecipeDifficultyRating: recipeDifficultyRating,
			RecipePrepTime: recipePrepTime,
			RecipeCookTime: recipeCookTime,
			ServingNumber: servingNumber,
			RecipeSource: recipeSource,
			catagoryID: categoryID,
			countryID: countryID,
			regionID: regionID,
		},
	});

	return newRecipe;
};
