import request from "supertest";
import app from "../../app";

describe("GET /api/method/recipesMethod/:recipeID", () => {
  describe("successful circumstances", () => {
    it("GET /api/method/recipesMethod/:recipeID", async () => {
      const recipeID = 1;
      const response = await request(app).get(
        "/api/method/recipesMethod/" + recipeID
      );

      expect(response.statusCode).toBe(200);
    });
  });

  describe("unsuccessful circumstances", () => {
    it("GET /api/method/recipesMethod/:recipeID", async () => {
      const recipeID = 0;
      const response = await request(app).get(
        "/api/method/recipesMethod/" + recipeID
      );

      expect(response.statusCode).toBe(400);
    });
  });
});
