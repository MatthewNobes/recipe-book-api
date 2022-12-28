import {
	Ingredients,
	measurementType,
	ingredientMeasurements,
	RecipeIngredients,
} from "@prisma/client";

/**
 * Used as a count object for show the number of items deleted when using deleteMany
 */
interface Count {
	count: number;
}

/**
 * Used to pass all the information about an ingredient for a recipe, including its quantity and the measurement type.
 */
type IngredientDetails = {
	ingredientMeasurementID: ingredientMeasurements["ingredientMeasurementID"];
	ingredientID: Ingredients["ingredientID"];
	ingredientName: Ingredients["ingredientName"];
	ingredientDescription: Ingredients["ingredientDescription"];
	ingredientInfoURL: Ingredients["ingredientInfoURL"];
	measurementSize: ingredientMeasurements["measurementSize"];
	measurementTypeID: measurementType["measurementTypeID"];
	measurementType: measurementType["measurementType"];
};

type FullMeasurements = {
	ingredientMeasurementID: ingredientMeasurements["ingredientMeasurementID"];
	measurementSize: ingredientMeasurements["measurementSize"];
	measurementType: measurementType[];
	Ingredients: Ingredients[];
};

type FullIngredientMeasurement = {
	recipeIngredientsID: RecipeIngredients["recipeIngredientsID"];
	recipeID: RecipeIngredients["recipeID"];
	ingredientMeasurementID: ingredientMeasurements["ingredientMeasurementID"];
	ingredientMeasurements: FullMeasurements[];
};

export {
	Count,
	IngredientDetails,
	FullIngredientMeasurement,
	FullMeasurements,
};
