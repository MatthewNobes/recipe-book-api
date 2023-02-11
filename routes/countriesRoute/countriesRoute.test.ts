import request from "supertest";
import app from "../../app";
import { prismaMock } from "../../singleton";
import { countries } from "@prisma/client";

describe("GET /api/countries/countries", () => {
	const mockCountryData: countries[] = [
		{
			countryID: 1,
			country: "Test 1",
		},
		{
			countryID: 2,
			country: "Test 2",
		},
	];

	beforeEach(() => {
		prismaMock.countries.findMany.mockResolvedValue(mockCountryData);
	});

	it("should return the mocked countries array", async () => {
		const response = await request(app).get("/api/countries/countries");

		expect(response.statusCode).toBe(200);
		expect(typeof response.body).toBe("object");
		expect(response.body).toStrictEqual({ data: mockCountryData });
		expect(Array.isArray(response.body.data)).toBe(true);
		expect(response.body.data).toStrictEqual(mockCountryData);
	});
});

describe("GET /api/countries/country/:countryID", () => {
	const mockCountryData: countries = {
		countryID: 1,
		country: "Test 1",
	};

	beforeEach(() => {
		prismaMock.countries.findUnique.mockResolvedValue(mockCountryData);
	});

	it("should return the requested mock country", async () => {
		const countryID = 1;
		const response = await request(app).get(
			"/api/countries/country/" + countryID,
		);

		expect(response.statusCode).toBe(200);
		expect(typeof response.body).toBe("object");
		expect(response.body).toStrictEqual({ data: mockCountryData });
	});

	it("should return `no country found`", async () => {
		const countryID = 888888;
		const response = await request(app).get(
			"/api/countries/country/" + countryID,
		);

		expect(response.statusCode).toBe(400);

		expect(typeof response.body.data).toBe("string");
		expect(response.body.data).toBe("no country found");
	});
});

describe("POST /api/countries/add/:countryID", () => {
	const mockCountry: countries = {
		countryID: 1,
		country: "Belgium",
	};

	beforeEach(() => {
		prismaMock.countries.create.mockResolvedValue(mockCountry);
	});
	describe("successful circumstances", () => {
		it("should return the added country Belgium", async () => {
			const country = "Belgium";

			const response = await request(app).post("/api/countries/add/" + country);

			expect(response.statusCode).toBe(201);
			expect(typeof response.body.data.countryID).toBe("number");
			expect(typeof response.body.data.country).toBe("string");
			expect(response.body).toStrictEqual({ data: mockCountry });
		});
	});

	describe("unsuccessful circumstances", () => {
		it("should return 404 as a lack of parameter will fail to find the route", async () => {
			const country = "";

			const response = await request(app).post("/api/countries/add/" + country);

			expect(response.statusCode).toBe(404);
		});
	});
});
