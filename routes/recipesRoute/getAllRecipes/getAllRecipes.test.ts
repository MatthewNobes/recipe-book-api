import { getAllRecipes } from "./getAllRecipes";
import { prismaMock } from "../../../singleton";
import { Recipes } from "@prisma/client";

describe("getAllRecipes", () => {
	const mockRecipeData: Recipes[] = [
		{
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
		},
		{
			RecipeID: 2,
			RecipeName: "Test recipe 2",
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
		},
	];

	beforeEach(() => {
		prismaMock.recipes.findMany.mockResolvedValue(mockRecipeData);
	});

	it("should return the mocked recipes array", async () => {
		const requestedRecipes = await getAllRecipes();
		expect(requestedRecipes).toStrictEqual(mockRecipeData);
	});
});
