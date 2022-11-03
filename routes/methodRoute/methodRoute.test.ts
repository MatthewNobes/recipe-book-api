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

describe("GET /api/method/add/:recipeID/:stepNumber/:stepText", () => {
  describe("successful circumstances", () => {
    it("All conditions valid", async () => {
      const recipeID = 1;
      const stepNumber = 1;
      const stepText = "Boil the kettle";
      const response = await request(app).post(
        "/api/method/add/" + recipeID + "/" + stepNumber + "/" + stepText
      );

      expect(response.statusCode).toBe(201);
      expect(response.body).toBe("New instruction added");
    });
  });

  describe("unsuccessful circumstances", () => {
    it("invalid step number", async () => {
      const recipeID = 1;
      const stepNumber = 0;
      const stepText = "Boil the kettle";
      const response = await request(app).post(
        "/api/method/add/" + recipeID + "/" + stepNumber + "/" + stepText
      );

      expect(response.statusCode).toBe(400);
      expect(response.body).toBe("invalid step number");
    });

    it("invalid recipeID", async () => {
      const recipeID = 0;
      const stepNumber = 1;
      const stepText = "Boil the kettle";
      const response = await request(app).post(
        "/api/method/add/" + recipeID + "/" + stepNumber + "/" + stepText
      );

      expect(response.statusCode).toBe(400);
      expect(response.body).toBe("the recipeID does not exist");
    });
  });
});
