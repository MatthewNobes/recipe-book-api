import { addRecipe } from "./addRecipe";
import { prismaMock } from "../../../singleton";
import { Recipes } from "@prisma/client";

describe("addRecipe", () => {
	const mockRecipes: Recipes = {
		RecipeID: 1,
		RecipeName: "Test recipe",
		RecipeDecsription: "Test description",
		RecipeDifficultyRating: 4,
		RecipePrepTime: "0:30",
		RecipeCookTime: "1:00",
		ServingNumber: 4,
		RecipeSource:
			"https://www.bbcgoodfood.com/recipes/mustardy-salmon-beetroot-lentils",
		catagoryID: 1,
		countryID: 2,
		regionID: 3,
	};

	beforeEach(() => {
		prismaMock.recipes.create.mockResolvedValue(mockRecipes);
	});

	it("should add the new recipe", async () => {
		const newRecipe = await addRecipe(
			"Test 1",
			"Test Description 1",
			4,
			4,
			"0:30",
			"1:00",
			"https://www.bbcgoodfood.com/recipes/mustardy-salmon-beetroot-lentils",
			1,
			2,
			3,
		);
		expect(newRecipe).toStrictEqual(mockRecipes);
	});

	it("should return undefined if a blank is passed in as the recipe name", async () => {
		const newRecipe = await addRecipe(
			"",
			"Test Description 1",
			4,
			4,
			"0:30",
			"1:00",
			"https://www.bbcgoodfood.com/recipes/mustardy-salmon-beetroot-lentils",
			1,
			2,
			3,
		);
		expect(newRecipe).toBeUndefined();
	});

	it("should return undefined if 0 is passed in as the serving number", async () => {
		const newRecipe = await addRecipe(
			"Test",
			"Test Description 1",
			0,
			4,
			"0:30",
			"1:00",
			"https://www.bbcgoodfood.com/recipes/mustardy-salmon-beetroot-lentils",
			1,
			2,
			3,
		);
		expect(newRecipe).toBeUndefined();
	});

	it("should return undefined if a decimal is passed in as the serving number", async () => {
		const newRecipe = await addRecipe(
			"Test",
			"Test Description 1",
			1.4,
			4,
			"0:30",
			"1:00",
			"https://www.bbcgoodfood.com/recipes/mustardy-salmon-beetroot-lentils",
			1,
			2,
			3,
		);
		expect(newRecipe).toBeUndefined();
	});
});
