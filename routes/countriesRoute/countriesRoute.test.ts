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
