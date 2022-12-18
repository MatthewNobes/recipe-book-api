import request from "supertest";
import app from "../../app";

describe("GET /api/measurementTypes/measurementTypes", () => {
	describe("successful circumstances", () => {
		it("GET /api/measurementTypes/measurementTypes", async () => {
			const response = await request(app).get(
				"/api/measurementTypes/measurementTypes",
			);

			expect(response.statusCode).toBe(200);
			expect(Array.isArray(response.body)).toBe(true);
			expect(response.body[0].measurementTypeID).toBeDefined();
			expect(response.body[0].measurementType).toBeDefined();
		});
	});
});

describe("GET /api/measurementTypes/add/:measurementType", () => {
	describe("successful circumstances", () => {
		it("GET /api/measurementTypes/add/:measurementType", async () => {
			const measurementType = "Kilograms";
			const response = await request(app).post(
				"/api/measurementTypes/add/" + measurementType,
			);

			expect(response.statusCode).toBe(201);
		});
	});

	describe("unsuccessful circumstances", () => {
		it("GET /api/measurementTypes/add/:measurementType", async () => {
			const measurementType = "";
			const response = await request(app).post(
				"/api/measurementTypes/add/" + measurementType,
			);

			expect(response.statusCode).toBe(404);
		});
	});
});
