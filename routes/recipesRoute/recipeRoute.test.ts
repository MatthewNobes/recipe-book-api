import request from "supertest";
import app from "../../app";
import { prismaMock } from "../../singleton";
import { recipes } from "@prisma/client";

describe("GET /recipes", () => {
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

	it("should return all the mocked recipes", async () => {
		const response = await request(app).get("/api/recipes/recipes");

		expect(response.statusCode).toBe(200);
		expect(response.body).toStrictEqual({ data: mockRecipeData });
	});
});

describe("GET /recipe/:recipeID", () => {
	const mockRecipe: recipes = {
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
		prismaMock.recipes.findFirst.mockResolvedValue(mockRecipe);
	});

	it("should return the requested mock recipe", async () => {
		const recipeID = 1;
		const response = await request(app).get("/api/recipes/recipe/" + recipeID);

		expect(response.statusCode).toBe(200);
		expect(typeof response.body).toBe("object");
		expect(response.body).toStrictEqual({ data: mockRecipe });
	});

	it("should return `no recipe found`", async () => {
		const recipeID = 1000;
		const response = await request(app).get("/api/recipes/recipe/" + recipeID);

		expect(response.statusCode).toBe(400);
		//expect(typeof response.body.data).toBe("string");
		expect(response.body.data).toBe("no recipe found");
	});
});

describe("POST /add/:recipeName/:recipeDescription/:recipeDifficultyRating/:recipePrepTime/:recipeCookTime/:servingNumber/:recipeSource/:catagoryID/:countryID/:regionID", () => {
	const mockRecipes: recipes = {
		recipeID: 1,
		recipeName: "Test recipe",
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
		prismaMock.recipes.create.mockResolvedValue(mockRecipes);
	});

	describe("successful circumstances", () => {
		it("should return the added recipe Test recipe", async () => {
			const recipeName = mockRecipes.recipeName;
			const recipeDescription = mockRecipes.recipeDescription;
			const recipeDifficultyRating = mockRecipes.recipeDifficultyRating;
			const recipePrepTime = mockRecipes.recipePrepTime;
			const recipeCookTime = mockRecipes.recipeCookTime;
			const servingNumber = mockRecipes.servingNumber;
			const recipeSource = mockRecipes.recipeSource;
			const categoryID = mockRecipes.categoryID;
			const countryID = mockRecipes.countryID;
			const regionID = mockRecipes.regionID;

			const response = await request(app).post(
				"/api/recipes/add/" +
					recipeName +
					"/" +
					recipeDescription +
					"/" +
					recipeDifficultyRating +
					"/" +
					recipePrepTime +
					"/" +
					recipeCookTime +
					"/" +
					servingNumber +
					"/" +
					recipeSource +
					"/" +
					categoryID +
					"/" +
					countryID +
					"/" +
					regionID,
			);

			expect(response.statusCode).toBe(201);
			expect(response.body).toStrictEqual({ data: mockRecipes });
		});
	});

	describe("unsuccessful circumstances", () => {
		it("should return 404 as a lack of parameter will fail to find the route", async () => {
			const recipeDescription = mockRecipes.recipeDescription;
			const recipeDifficultyRating = mockRecipes.recipeDifficultyRating;
			const recipePrepTime = mockRecipes.recipePrepTime;
			const recipeCookTime = mockRecipes.recipeCookTime;
			const servingNumber = mockRecipes.servingNumber;
			const recipeSource = mockRecipes.recipeSource;
			const categoryID = mockRecipes.categoryID;
			const countryID = mockRecipes.countryID;
			const regionID = mockRecipes.regionID;

			const response = await request(app).post(
				"/api/recipes/add/" +
					recipeDescription +
					"/" +
					recipeDifficultyRating +
					"/" +
					recipePrepTime +
					"/" +
					recipeCookTime +
					"/" +
					servingNumber +
					"/" +
					recipeSource +
					"/" +
					categoryID +
					"/" +
					countryID +
					"/" +
					regionID,
			);
			expect(response.statusCode).toBe(404);
		});

		it("should return 400 if passed a string for the serving number", async () => {
			const recipeName = mockRecipes.recipeName;
			const recipeDescription = mockRecipes.recipeDescription;
			const recipeDifficultyRating = mockRecipes.recipeDifficultyRating;
			const recipePrepTime = mockRecipes.recipePrepTime;
			const recipeCookTime = mockRecipes.recipeCookTime;
			const servingNumber = "Hello";
			const recipeSource = mockRecipes.recipeSource;
			const categoryID = mockRecipes.categoryID;
			const countryID = mockRecipes.countryID;
			const regionID = mockRecipes.regionID;

			const response = await request(app).post(
				"/api/recipes/add/" +
					recipeName +
					"/" +
					recipeDescription +
					"/" +
					recipeDifficultyRating +
					"/" +
					recipePrepTime +
					"/" +
					recipeCookTime +
					"/" +
					servingNumber +
					"/" +
					recipeSource +
					"/" +
					categoryID +
					"/" +
					countryID +
					"/" +
					regionID,
			);
			expect(response.statusCode).toBe(400);
			expect(response.body.data).toBe("invalid parameters");
		});
	});
});
