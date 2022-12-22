import { doesRecipeExist } from "./doesRecipeExist";
import { prismaMock } from "../../../singleton";
import { Recipes } from "@prisma/client";

describe("doesRecipeExist", () => {
	const mockRecipeData: Recipes = {
		RecipeID: 1,
		RecipeName: "Test recipe 1",
		RecipeDecsription: "Test description",
		RecipeDifficultyRating: 4,
		RecipePrepTime: "0:30",
		RecipeCookTime: "1:00",
		ServingNumber: 4,
		RecipeSource:
			"https%3A%2F%2Fwww.bbcgoodfood.com%2Frecipes%2Fmustardy-salmon-beetroot-lentils",
		catagoryID: 1,
		countryID: 2,
		regionID: 3,
	};

	beforeEach(() => {
		prismaMock.recipes.findFirst.mockResolvedValue(mockRecipeData);
	});

	it("should return true for the recipeID 1", async () => {
		const recipeID = 1;
		const doesItExist = await doesRecipeExist(recipeID);

		expect(doesItExist).toBe(true);
	});

	it("should return false for the recipeID 99999", async () => {
		const recipeID = 99999;
		const doesItExist = await doesRecipeExist(recipeID);

		expect(doesItExist).toBe(false);
	});
});
