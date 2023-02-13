import request from "supertest";
import app from "../../app";
import { prismaMock } from "../../singleton";
import { recipeSteps } from "@prisma/client";
import { Count } from "../../interfaces";

describe("GET /api/method/method/:recipeID", () => {
	const mockRecipeStepsData: recipeSteps[] = [
		{
			recipeStepID: 1,
			stepNumber: 1,
			stepText: "Test 1",
			recipeID: 1,
		},
		{
			recipeStepID: 2,
			stepNumber: 2,
			stepText: "Test 2",
			recipeID: 1,
		},
	];

	beforeEach(() => {
		prismaMock.recipeSteps.findMany.mockResolvedValue(mockRecipeStepsData);
	});

	it("should return the requested mock steps array", async () => {
		const recipeID = 1;
		const response = await request(app).get("/api/method/method/" + recipeID);

		expect(response.statusCode).toBe(200);
		expect(typeof response.body).toBe("object");
		expect(response.body).toStrictEqual({ data: mockRecipeStepsData });
	});

	it("should return `no method found` when asked for a recipe that has no steps", async () => {
		const recipeID = 888888;
		const response = await request(app).get("/api/method/method/" + recipeID);

		expect(response.statusCode).toBe(400);

		expect(typeof response.body.data).toBe("string");
		expect(response.body.data).toBe("no method found");
	});
});

describe("GET /api/method/step/:recipeStepID", () => {
	const mockRecipeStepsData: recipeSteps = {
		recipeStepID: 1,
		stepNumber: 1,
		stepText: "Test 1",
		recipeID: 1,
	};

	beforeEach(() => {
		prismaMock.recipeSteps.findFirst.mockResolvedValue(mockRecipeStepsData);
	});

	it("should return the requested mock step", async () => {
		const recipeStepID = 1;
		const response = await request(app).get("/api/method/step/" + recipeStepID);

		expect(response.statusCode).toBe(200);
		expect(typeof response.body).toBe("object");
		expect(response.body).toStrictEqual({ data: mockRecipeStepsData });
	});

	it("should return `no steps found` when asked for a recipe that has no steps", async () => {
		const recipeStepID = 888888;
		const response = await request(app).get("/api/method/step/" + recipeStepID);

		expect(response.statusCode).toBe(400);

		expect(typeof response.body.data).toBe("string");
		expect(response.body.data).toBe("no steps found");
	});
});

describe("POST /api/method/step/add/:recipeID/:stepNumber/:stepText", () => {
	const mockRecipeStepsData: recipeSteps = {
		recipeStepID: 1,
		stepNumber: 3,
		stepText: "Step 1",
		recipeID: 1,
	};

	beforeEach(() => {
		prismaMock.recipeSteps.create.mockResolvedValue(mockRecipeStepsData);
	});
	describe("successful circumstances", () => {
		it("should return the added recipe step, Step 1, with the instruction number 3", async () => {
			const stepText = "Step 1";
			const stepNumber = 3;
			const recipeID = 1;

			const response = await request(app).post(
				"/api/method/step/add/" + recipeID + "/" + stepNumber + "/" + stepText,
			);

			expect(response.statusCode).toBe(201);
			expect(typeof response.body.data.stepNumber).toBe("number");
			expect(typeof response.body.data.stepText).toBe("string");
			expect(typeof response.body.data.recipeID).toBe("number");
			expect(typeof response.body.data.recipeStepID).toBe("number");
			expect(response.body).toStrictEqual({ data: mockRecipeStepsData });
		});
	});

	describe("unsuccessful circumstances", () => {
		it("should return 404 as a lack of parameter will fail to find the route", async () => {
			const stepText = "";
			const stepNumber = 3;
			const recipeID = 1;

			const response = await request(app).post(
				"/api/method/step/add/" + recipeID + "/" + stepNumber + "/" + stepText,
			);

			expect(response.statusCode).toBe(404);
		});
	});
});

describe("DELETE /api/method/step/delete/:recipeStepID", () => {
	describe("successful circumstances", () => {
		const mockRecipeStepsData: recipeSteps = {
			recipeStepID: 1,
			stepNumber: 3,
			stepText: "Step 1",
			recipeID: 1,
		};

		beforeEach(() => {
			prismaMock.recipeSteps.delete.mockResolvedValue(mockRecipeStepsData);
		});
		it("should return the deleted step", async () => {
			const recipeStepID = 1;

			const response = await request(app).delete(
				"/api/method/step/delete/" + recipeStepID,
			);

			expect(response.statusCode).toBe(200);
			expect(typeof response.body.data.stepNumber).toBe("number");
			expect(typeof response.body.data.stepText).toBe("string");
			expect(typeof response.body.data.recipeID).toBe("number");
			expect(typeof response.body.data.recipeStepID).toBe("number");
			expect(response.body).toStrictEqual({ data: mockRecipeStepsData });
		});
	});

	describe("unsuccessful circumstances", () => {
		it("should return 404 as a lack of parameter will fail to find the route", async () => {
			const response = await request(app).delete("/api/method/step/delete/");
			expect(response.statusCode).toBe(404);
		});

		it("should return 400 as an invalid recipeStepID will not be able to delete anything", async () => {
			const recipeStepID = 0;

			const response = await request(app).delete(
				"/api/method/step/delete/" + recipeStepID,
			);
			expect(response.statusCode).toBe(400);
			expect(response.body).toStrictEqual({ data: "invalid recipeStepID" });
		});
	});
});

describe("DELETE /api/method/method/delete/:recipeID", () => {
	describe("successful circumstances", () => {
		const mockCount: Count = {
			count: 5,
		};

		beforeEach(() => {
			prismaMock.recipeSteps.deleteMany.mockResolvedValue(mockCount);
		});

		it("should return the count of deleted steps", async () => {
			const recipeID = 1;

			const response = await request(app).delete(
				"/api/method/method/delete/" + recipeID,
			);

			expect(response.statusCode).toBe(200);
			expect(typeof response.body.data).toBe("object");
			expect(typeof response.body).toBe("object");
			expect(response.body).toStrictEqual({ data: mockCount });
		});
	});

	describe("unsuccessful circumstances", () => {
		const mockCount: Count = {
			count: 0,
		};

		beforeEach(() => {
			prismaMock.recipeSteps.deleteMany.mockResolvedValue(mockCount);
		});

		it("should return the count of zero if there are no records for the ID", async () => {
			const recipeID = 0;

			const response = await request(app).delete(
				"/api/method/method/delete/" + recipeID,
			);

			expect(response.statusCode).toBe(400);
			expect(typeof response.body.data).toBe("string");
			expect(typeof response.body).toBe("object");
			expect(response.body).toStrictEqual({ data: "invalid parameter" });
		});
	});
});

describe("PUT /api/method/instructionTextUpdate/:recipeID/:stepText", () => {
	const mockRecipeStepsData: recipeSteps = {
		recipeStepID: 1,
		stepNumber: 3,
		stepText: "Updated text",
		recipeID: 1,
	};

	beforeEach(() => {
		prismaMock.recipeSteps.update.mockResolvedValue(mockRecipeStepsData);
	});
	describe("successful circumstances", () => {
		it("should return the updated recipe step text", async () => {
			const updatedStepText = "Updated text";
			const recipeStepID = 1;

			const response = await request(app).put(
				"/api/method/step/update/stepText/" +
					recipeStepID +
					"/" +
					updatedStepText,
			);

			expect(response.statusCode).toBe(200);
			expect(response.body).toStrictEqual({ data: mockRecipeStepsData });
		});
	});

	describe("unsuccessful circumstances", () => {
		it("should return 404 as a lack of parameter will fail to find the route", async () => {
			const updatedStepText = "";
			const recipeStepID = 1;

			const response = await request(app).put(
				"/api/method/step/update/stepText/" +
					recipeStepID +
					"/" +
					updatedStepText,
			);

			expect(response.statusCode).toBe(404);
		});
	});
});

describe("PUT /api/method/step/update/stepNumber/:recipeID/:stepNumber", () => {
	const mockRecipeStepsData: recipeSteps = {
		recipeStepID: 1,
		stepNumber: 3,
		stepText: "Updated text",
		recipeID: 1,
	};

	beforeEach(() => {
		prismaMock.recipeSteps.update.mockResolvedValue(mockRecipeStepsData);
	});
	describe("successful circumstances", () => {
		it("should return the updated recipe step number as a step object", async () => {
			const updatedStepNumber = 3;
			const recipeStepID = 1;

			const response = await request(app).put(
				"/api/method/step/update/stepNumber/" +
					recipeStepID +
					"/" +
					updatedStepNumber,
			);

			expect(response.statusCode).toBe(200);
			expect(response.body).toStrictEqual({ data: mockRecipeStepsData });
		});
	});

	describe("unsuccessful circumstances", () => {
		it("should return 400 when passed an updatedStepNumber of 0", async () => {
			const updatedStepNumber = 0;
			const recipeStepID = 1;

			const response = await request(app).put(
				"/api/method/step/update/stepNumber/" +
					recipeStepID +
					"/" +
					updatedStepNumber,
			);

			expect(response.statusCode).toBe(400);
			expect(response.body).toStrictEqual({ data: "no step found" });
		});
	});
});
