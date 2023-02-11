import { addFullIngredient } from "./addFullIngredient";
import { prismaMock } from "../../../singleton";
import {
	ingredientMeasurements,
	ingredients,
	recipeIngredients,
} from "@prisma/client";

describe("addFullIngredient", () => {
	const mockIngredient: ingredients = {
		ingredientID: 1,
		ingredient: "Hello",
		ingredientDescription: "Hello world",
		ingredientInfoURL: "encodedURLhere",
	};

	const mockIngredientMeasurement: ingredientMeasurements = {
		ingredientMeasurementID: 1,
		ingredientID: 1,
		measurementTypeID: 2,
		measurementSize: 23,
	};

	const mockRecipeIngredients: recipeIngredients = {
		recipeIngredientID: 1,
		recipeID: 1,
		ingredientMeasurementID: 1,
	};

	beforeEach(() => {
		prismaMock.ingredients.create.mockResolvedValue(mockIngredient);

		prismaMock.ingredientMeasurements.create.mockResolvedValue(
			mockIngredientMeasurement,
		);

		prismaMock.recipeIngredients.create.mockResolvedValue(
			mockRecipeIngredients,
		);
	});

	it("should add the new ingredientMeasurement", async () => {
		const fullIngredient = {
			recipeIngredientID: 1,
			ingredientName: "Hello",
			ingredientDescription: "Hello world",
			ingredientInfoURL: "encodedURLhere",
			measurementTypeID: 2,
			measurementSize: 23,
			recipeID: 1,
		};
		const newLinkedIngredient = await addFullIngredient(
			fullIngredient.ingredientName,
			fullIngredient.ingredientDescription,
			fullIngredient.ingredientInfoURL,
			fullIngredient.measurementTypeID,
			fullIngredient.measurementSize,
			fullIngredient.recipeID,
		);
		expect(newLinkedIngredient).toStrictEqual(fullIngredient);
	});
});
