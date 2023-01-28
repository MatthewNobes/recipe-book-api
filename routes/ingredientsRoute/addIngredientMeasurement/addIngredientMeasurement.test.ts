import { addIngredientMeasurement } from "./addIngredientMeasurement";
import { prismaMock } from "../../../singleton";
import { ingredientMeasurements } from "@prisma/client";

describe("addIngredientMeasurement", () => {
	const mockIngredientMeasurement: ingredientMeasurements = {
		ingredientMeasurementID: 1,
		ingredientID: 1,
		measurementTypeID: 1,
		measurementSize: 500,
	};

	beforeEach(() => {
		prismaMock.ingredientMeasurements.create.mockResolvedValue(
			mockIngredientMeasurement,
		);
	});

	it("should add the new ingredientMeasurement", async () => {
		const newIngredientMeasurement = await addIngredientMeasurement(1, 1, 500);
		expect(newIngredientMeasurement).toStrictEqual(mockIngredientMeasurement);
	});
});
