import { addNewIngredient } from "../addNewIngredient/addNewIngredient";
import { addIngredientMeasurement } from "../addIngredientMeasurement/addIngredientMeasurement";
import { linkIngredientMeasurementToRecipe } from "../linkIngredientMeasurementToRecipe/linkIngredientMeasurementToRecipe";

export const addFullIngredient = async (
	ingredientName: string,
	ingredientDescription: string,
	ingredientInfoURL: string,
	measurementTypeID: number,
	measurementSize: number,
	recipeID: number,
) => {
	try {
		// 1 add the ingredient
		const ingredient = await addNewIngredient(
			ingredientName,
			ingredientDescription,
			ingredientInfoURL,
		);

		if (ingredient?.ingredientID) {
			// 2 add the ingredient measurement
			const ingredientMeasurement = await addIngredientMeasurement(
				ingredient?.ingredientID,
				measurementTypeID,
				measurementSize,
			);

			if (ingredientMeasurement?.ingredientMeasurementID) {
				// 3 link the ingredient measurement to the recipe
				const linkedIngredient = await linkIngredientMeasurementToRecipe(
					recipeID,
					ingredientMeasurement?.ingredientMeasurementID,
				);

				if (linkedIngredient?.recipeID) {
					return {
						recipeIngredientID: linkedIngredient?.recipeIngredientID,
						ingredientName: ingredient.ingredient,
						ingredientDescription: ingredient.ingredientDescription,
						ingredientInfoURL: ingredient.ingredientInfoURL,
						measurementTypeID: ingredientMeasurement.measurementTypeID,
						measurementSize: ingredientMeasurement.measurementSize,
						recipeID: linkedIngredient?.recipeID,
					};
				} else {
					throw "";
				}
			} else {
				throw "";
			}
		} else {
			throw "";
		}
	} catch (error) {
		return undefined;
	}
};
