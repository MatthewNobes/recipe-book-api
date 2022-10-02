import request from "supertest";
import app from "../../app";

describe("GET /allRecipes", () => {
  describe("successful circumstances", () => {
    it("GET /allRecipes", async () => {
      const response = await request(app).get("/api/recipes/allRecipes");

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0].recipeID).toBeDefined();
      expect(response.body[0].recipeName).toBeDefined();
      expect(response.body[0].recipeDecsription).toBeDefined();
      // expect(response.body[0].recipeDifficultyRating).toBeDefined();
      expect(response.body[0].recipePrepTime).toBeDefined();
      expect(response.body[0].recipeCookTime).toBeDefined();
      expect(response.body[0].servingNumber).toBeDefined();
      // expect(response.body[0].recipeSource).toBeDefined();
    });
  });
});

describe("GET /recipe/:recipeID", () => {
  describe("successful circumstances", () => {
    it("GET /recipe/:recipeIDs", async () => {
      const testRecipeID = 1;
      const response = await request(app).get(
        "/api/recipes/recipe/" + testRecipeID
      );

      expect(response.statusCode).toBe(200);
      expect(typeof response.body).toBe("object");

      expect(response.body.recipeID).toBeDefined();
      expect(response.body.recipeName).toBeDefined();
      expect(response.body.recipeDecsription).toBeDefined();
      // expect(response.body.recipeDifficultyRating).toBeDefined();
      expect(response.body.recipePrepTime).toBeDefined();
      expect(response.body.recipeCookTime).toBeDefined();
      expect(response.body.servingNumber).toBeDefined();
      // expect(response.body.recipeSource).toBeDefined();
      expect(Array.isArray(response.body.ingredients)).toBe(true);
    });
  });

  describe("unsuccessful circumstances", () => {
    it("GET /recipe/:recipeIDs", async () => {
      const testRecipeID = 0;
      const response = await request(app).get(
        "/api/recipes/recipe/" + testRecipeID
      );

      expect(response.statusCode).toBe(400);
    });
  });
});