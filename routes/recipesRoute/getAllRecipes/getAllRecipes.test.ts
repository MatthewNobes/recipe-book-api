import { getAllRecipes } from "./getAllRecipes";
import { prismaMock } from "../../../singleton";
import { recipes } from "@prisma/client";

describe("getAllRecipes", () => {
	const mockRecipeData: recipes[] = [
		{
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
		},
		{
			recipeID: 2,
			recipeName: "Test recipe 2",
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
