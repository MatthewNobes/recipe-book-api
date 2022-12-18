import request from "supertest";
import app from "../../app";

describe("GET /allRecipes", () => {
	describe("successful circumstances", () => {
		it("GET /allRecipes", async () => {
			const response = await request(app).get("/api/recipes/allRecipes");

			expect(response.statusCode).toBe(200);
			expect(Array.isArray(response.body)).toBe(true);
			expect(response.body[0].RecipeID).toBeDefined();
			expect(response.body[0].RecipeName).toBeDefined();
			expect(response.body[0].RecipeDecsription).toBeDefined();
			// expect(response.body[0].recipeDifficultyRating).toBeDefined();
			expect(response.body[0].RecipePrepTime).toBeDefined();
			expect(response.body[0].RecipeCookTime).toBeDefined();
			expect(response.body[0].ServingNumber).toBeDefined();
			// expect(response.body[0].recipeSource).toBeDefined();
		});
	});
});

describe("GET /recipe/:recipeID", () => {
	describe("successful circumstances", () => {
		it("GET /recipe/:recipeIDs", async () => {
			const testRecipeID = 1;
			const response = await request(app).get(
				"/api/recipes/recipe/" + testRecipeID,
			);

			expect(response.statusCode).toBe(200);
			expect(typeof response.body).toBe("object");

			expect(response.body.RecipeID).toBeDefined();
			expect(response.body.RecipeName).toBeDefined();
			expect(response.body.RecipeDecsription).toBeDefined();
			// expect(response.body.recipeDifficultyRating).toBeDefined();
			expect(response.body.RecipePrepTime).toBeDefined();
			expect(response.body.RecipeCookTime).toBeDefined();
			expect(response.body.ServingNumber).toBeDefined();
			// expect(response.body.recipeSource).toBeDefined();
		});
	});

	describe("unsuccessful circumstances", () => {
		it("GET /recipe/:recipeIDs", async () => {
			const testRecipeID = 0;
			const response = await request(app).get(
				"/api/recipes/recipe/" + testRecipeID,
			);

			expect(response.statusCode).toBe(400);
		});
	});
});
