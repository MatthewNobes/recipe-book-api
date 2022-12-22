import { getRecipeByID } from "./getRecipeByID";
import { Recipes } from "@prisma/client";
import { prismaMock } from "../../../singleton";

describe("getRecipeByID", () => {
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

	it("should return the requested mock recipe", async () => {
		const requestedRecipe = await getRecipeByID(1);
		expect(requestedRecipe).toStrictEqual(mockRecipeData);
	});

	it("should return undefined when looking for a recipe that doesn't exist", async () => {
		const requestedRecipeID = 1234;
		const requestedRecipe = await getRecipeByID(requestedRecipeID);
		expect(requestedRecipe).toBeUndefined();
	});
});
