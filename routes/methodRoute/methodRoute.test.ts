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
      expect(typeof response.body.data[0].recipeID).toBe("number");
      expect(typeof response.body.data[0].recipeStepID).toBe("number");
      expect(typeof response.body.data[0].stepNumber).toBe("number");
      expect(typeof response.body.data[0].stepText).toBe("string");
    });
  });

  describe("unsuccessful circumstances", () => {
    it("GET /api/method/recipesMethod/:recipeID", async () => {
      const recipeID = 0;
      const response = await request(app).get(
        "/api/method/recipesMethod/" + recipeID
      );

      expect(response.statusCode).toBe(400);
      expect(response.body.data).toBe("no method found");
    });
  });
});

describe("GET /api/method/instruction/:recipeStepID", () => {
  describe("successful circumstances", () => {
    it("GET /api/method/instruction/:recipeStepID", async () => {
      const recipeStepID = 1;
      const response = await request(app).get(
        "/api/method/instruction/" + recipeStepID
      );

      expect(response.statusCode).toBe(200);
      expect(typeof response.body.data.recipeID).toBe("number");
      expect(typeof response.body.data.recipeStepID).toBe("number");
      expect(typeof response.body.data.stepNumber).toBe("number");
      expect(typeof response.body.data.stepText).toBe("string");
    });
  });

  describe("unsuccessful circumstances", () => {
    it("GET /api/method/instruction/:recipeStepID", async () => {
      const recipeStepID = 0;
      const response = await request(app).get(
        "/api/method/instruction/" + recipeStepID
      );

      expect(response.statusCode).toBe(400);
      expect(response.body.data).toBe("no instruction found");
    });
  });
});

describe("POST /api/method/add/:recipeID/:stepNumber/:stepText", () => {
  describe("successful circumstances", () => {
    let addedID = 0;
    afterEach(async () => {
      const response = await request(app).delete(
        "/api/method/instruction/" + addedID
      );
    });
    it("All conditions valid", async () => {
      const recipeID = 1;
      const stepNumber = 1;
      const stepText = "Boil the kettle";
      const response = await request(app).post(
        "/api/method/add/" + recipeID + "/" + stepNumber + "/" + stepText
      );

      expect(response.statusCode).toBe(201);
      expect(typeof response.body.data.recipeID).toBe("number");
      expect(typeof response.body.data.recipeStepID).toBe("number");
      expect(typeof response.body.data.stepNumber).toBe("number");
      expect(typeof response.body.data.stepText).toBe("string");

      addedID = response.body.data.recipeStepID;
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
      expect(response.body.data).toBe("invalid step number");
    });

    it("invalid recipeID", async () => {
      const recipeID = 0;
      const stepNumber = 1;
      const stepText = "Boil the kettle";
      const response = await request(app).post(
        "/api/method/add/" + recipeID + "/" + stepNumber + "/" + stepText
      );

      expect(response.statusCode).toBe(400);
      expect(response.body.data).toBe("the recipeID does not exist");
    });
  });
});

describe("POST /api/method/add/:recipeID/:stepNumber/:stepText", () => {
  let activeID = 0;
  beforeEach(async () => {
    const recipeID = 1;
    const stepNumber = 1;
    const stepText = "Boil the kettle";
    const response = await request(app).post(
      "/api/method/add/" + recipeID + "/" + stepNumber + "/" + stepText
    );

    activeID = await response.body.data.recipeStepID;
  });
  describe("successful circumstances", () => {
    it("Valid recipeStepID", async () => {
      const response = await request(app).delete(
        "/api/method/instruction/" + activeID
      );

      expect(response.statusCode).toBe(200);
      expect(typeof response.body.data.recipeID).toBe("number");
      expect(typeof response.body.data.recipeStepID).toBe("number");
      expect(typeof response.body.data.stepNumber).toBe("number");
      expect(typeof response.body.data.stepText).toBe("string");
    });
  });
});

describe("PUT /api/method/instructionTextUpdate/:recipeID/:stepText", () => {
  describe("successful circumstances", () => {
    it("Valid text update conditions valid", async () => {
      const recipeID = 1;
      const stepText = "Do something different";
      const response = await request(app).put(
        "/api/method/instructionTextUpdate/" + recipeID + "/" + stepText
      );

      expect(response.statusCode).toBe(200);
      expect(typeof response.body.data.recipeID).toBe("number");
      expect(typeof response.body.data.recipeStepID).toBe("number");
      expect(typeof response.body.data.stepNumber).toBe("number");
      expect(typeof response.body.data.stepText).toBe("string");
      expect(response.body.data.stepText).toBe(stepText);
    });
  });
});
