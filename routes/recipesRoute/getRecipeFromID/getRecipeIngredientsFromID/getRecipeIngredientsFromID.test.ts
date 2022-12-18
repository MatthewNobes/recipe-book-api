import {
	getRecipeIngredientsFromID,
	getIngredientMeasurement,
	getIngredientFromIngredientID,
	getMeasurementTypeFromMeasurementTypeID,
} from "./getRecipeIngredientsFromID";

describe("getRecipeIngredientsFromID", () => {
	it("successful circumstance", async () => {
		const recipeIngredients = await getRecipeIngredientsFromID(1);

		if (
			recipeIngredients &&
			recipeIngredients[0] &&
			recipeIngredients[0].measurementType &&
			recipeIngredients[0].ingredient
		) {
			expect(Array.isArray(recipeIngredients)).toBe(true);
			expect(typeof recipeIngredients[0]).toBe("object");
			expect(recipeIngredients[0].ingredientMeasurementID).toBeDefined();
			expect(typeof recipeIngredients[0].ingredient).toBe("object");
			expect(recipeIngredients[0].ingredient.ingredientID).toBeDefined();
			expect(recipeIngredients[0].ingredient.ingredientName).toBeDefined();
			expect(
				recipeIngredients[0].ingredient.ingredientDescription,
			).toBeDefined();
			expect(recipeIngredients[0].ingredient.ingredientInfoURL).toBeDefined();
			expect(recipeIngredients[0].measurementSize).toBeDefined();
			expect(typeof recipeIngredients[0].measurementType).toBe("object");
			expect(
				recipeIngredients[0].measurementType.measurementTypeID,
			).toBeDefined();
			expect(
				recipeIngredients[0].measurementType.measurementType,
			).toBeDefined();
		}
	});
});

describe("getIngredientMeasurement", () => {
	it("successful circumstance", async () => {
		const ingredientMeasurement = await getIngredientMeasurement(1);

		if (
			ingredientMeasurement &&
			ingredientMeasurement.measurementType &&
			ingredientMeasurement.ingredient
		) {
			expect(typeof ingredientMeasurement).toBe("object");
			expect(ingredientMeasurement.ingredientMeasurementID).toBeDefined();
			expect(typeof ingredientMeasurement.ingredient).toBe("object");
			expect(ingredientMeasurement.ingredient.ingredientID).toBeDefined();
			expect(ingredientMeasurement.ingredient.ingredientName).toBeDefined();
			expect(
				ingredientMeasurement.ingredient.ingredientDescription,
			).toBeDefined();
			expect(ingredientMeasurement.ingredient.ingredientInfoURL).toBeDefined();
			expect(ingredientMeasurement.measurementSize).toBeDefined();
			expect(typeof ingredientMeasurement.measurementType).toBe("object");
			expect(
				ingredientMeasurement.measurementType.measurementTypeID,
			).toBeDefined();
			expect(
				ingredientMeasurement.measurementType.measurementType,
			).toBeDefined();
		}
	});
});

describe("getIngredientFromIngredientID", () => {
	it("successful circumstance", async () => {
		const ingredient = await getIngredientFromIngredientID(1);

		if (ingredient) {
			expect(typeof ingredient).toBe("object");
			expect(ingredient.ingredientID).toBeDefined();
			expect(ingredient.ingredientName).toBeDefined();
			expect(ingredient.ingredientDescription).toBeDefined();
			expect(ingredient.ingredientInfoURL).toBeDefined();
		}
	});
});

describe("getMeasurementTypeFromMeasurementTypeID", () => {
	it("successful circumstance", async () => {
		const measurementType = await getMeasurementTypeFromMeasurementTypeID(1);

		if (measurementType) {
			expect(typeof measurementType).toBe("object");
			expect(measurementType.measurementTypeID).toBeDefined();
			expect(measurementType.measurementType).toBeDefined();
		}
	});
});
