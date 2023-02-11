import { getRecipeByID } from "./getRecipeByID";
import { recipes } from "@prisma/client";
import { prismaMock } from "../../../singleton";

describe("getRecipeByID", () => {
	const mockRecipeData: recipes = {
		recipeID: 1,
		recipeName: "Test recipe 1",
		recipeDescription: "Test description",
		recipeDifficultyRating: 4,
		recipePrepTime: "0:30",
		recipeCookTime: "1:00",
		servingNumber: 4,
		recipeSource:
			"https%3A%2F%2Fwww.bbcgoodfood.com%2Frecipes%2Fmustardy-salmon-beetroot-lentils",
		categoryID: 1,
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
