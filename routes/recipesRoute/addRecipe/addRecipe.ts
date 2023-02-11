import { recipes } from "@prisma/client";
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
): Promise<recipes | undefined> => {
	if (
		recipeName === "" ||
		servingNumber === 0 ||
		!Number.isInteger(servingNumber)
	) {
		return undefined;
	}
	const newRecipe = await prisma.recipes.create({
		data: {
			recipeName: recipeName,
			recipeDescription: recipeDescription,
			recipeDifficultyRating: recipeDifficultyRating,
			recipePrepTime: recipePrepTime,
			recipeCookTime: recipeCookTime,
			servingNumber: servingNumber,
			recipeSource: recipeSource,
			categoryID: categoryID,
			countryID: countryID,
			regionID: regionID,
		},
	});

	return newRecipe;
};
