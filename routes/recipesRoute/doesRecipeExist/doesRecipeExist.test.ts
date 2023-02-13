import { doesRecipeExist } from "./doesRecipeExist";
import { prismaMock } from "../../../singleton";
import { recipes } from "@prisma/client";

describe("doesRecipeExist", () => {
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
