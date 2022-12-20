import request from "supertest";
import app from "../../app";
import { prismaMock } from "../../singleton";
import { measurementType } from "@prisma/client";

describe("GET /api/measurementTypes/measurementTypes", () => {
	const mockMeasurementTypeData: measurementType[] = [
		{
			measurementTypeID: 1,
			measurementType: "Test 1",
		},
		{
			measurementTypeID: 1,
			measurementType: "Test 2",
		},
	];

	beforeEach(() => {
		prismaMock.measurementType.findMany.mockResolvedValue(
			mockMeasurementTypeData,
		);
	});

	it("should return the mocked measurement type array", async () => {
		const response = await request(app).get(
			"/api/measurementTypes/measurementTypes",
		);

		expect(response.statusCode).toBe(200);
		expect(typeof response.body).toBe("object");
		expect(response.body).toStrictEqual({ data: mockMeasurementTypeData });
		expect(Array.isArray(response.body.data)).toBe(true);
		expect(response.body.data).toStrictEqual(mockMeasurementTypeData);
	});
});

describe("POST /api/measurementTypes/add/:measurementType", () => {
	const mockMeasurementType: measurementType = {
		measurementTypeID: 1,
		measurementType: "Kilograms",
	};

	beforeEach(() => {
		prismaMock.measurementType.create.mockResolvedValue(mockMeasurementType);
	});
	describe("successful circumstances", () => {
		it("should return the added measurement type", async () => {
			const measurementType = "Kilograms";
			const response = await request(app).post(
				"/api/measurementTypes/add/" + measurementType,
			);

			expect(response.statusCode).toBe(201);
			expect(response.body).toStrictEqual({ data: mockMeasurementType });
		});
	});

	describe("unsuccessful circumstances", () => {
		it("should return 404 as a lack of parameter will fail to find the route", async () => {
			const measurementType = "";
			const response = await request(app).post(
				"/api/measurementTypes/add/" + measurementType,
			);

			expect(response.statusCode).toBe(404);
		});
	});
});
