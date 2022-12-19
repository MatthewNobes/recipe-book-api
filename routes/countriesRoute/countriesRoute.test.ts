import request from "supertest";
import app from "../../app";

describe("GET /api/countries/countries", () => {
	it("successful circumstances", async () => {
		const response = await request(app).get("/api/countries/countries");

		expect(response.statusCode).toBe(200);

		expect(Array.isArray(response.body.data)).toBe(true);
		expect(typeof response.body.data[0]).toBe("object");
		expect(typeof response.body.data[0].countryID).toBe("number");
		expect(typeof response.body.data[0].country).toBe("string");
	});
});

describe("GET /api/countries/country/:countryID", () => {
	it("successful circumstances", async () => {
		const countryID = 1;
		const response = await request(app).get(
			"/api/countries/country/" + countryID,
		);

		expect(response.statusCode).toBe(200);

		expect(typeof response.body.data).toBe("object");
		expect(typeof response.body.data.countryID).toBe("number");
		expect(typeof response.body.data.country).toBe("string");
	});

	it("unsuccessful circumstances", async () => {
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
	describe("successful circumstances", () => {
		/** 
    let addedID = 0;
    afterEach(async () => {
      const response = await request(app).delete(
        "/api/method/instruction/" + addedID
      );
    });
    */
		it("All conditions valid", async () => {
			const country = "Belgium";

			const response = await request(app).post("/api/countries/add/" + country);

			expect(response.statusCode).toBe(201);
			expect(typeof response.body.data.countryID).toBe("number");
			expect(typeof response.body.data.country).toBe("string");

			// addedID = response.body.data.recipeStepID;
		});
	});

	describe("unsuccessful circumstances", () => {
		it("empty country", async () => {
			const country = "";

			const response = await request(app).post("/api/countries/add/" + country);

			expect(response.statusCode).toBe(404);
		});
	});
});