import {
	ingredients,
	measurementType,
	ingredientMeasurements,
	recipeIngredients,
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
	ingredientID: ingredients["ingredientID"];
	ingredient: ingredients["ingredient"];
	ingredientDescription: ingredients["ingredientDescription"];
	ingredientInfoURL: ingredients["ingredientInfoURL"];
	measurementSize: ingredientMeasurements["measurementSize"];
	measurementTypeID: measurementType["measurementTypeID"];
	measurementType: measurementType["measurementType"];
};

type FullMeasurements = {
	ingredientMeasurementID: ingredientMeasurements["ingredientMeasurementID"];
	measurementSize: ingredientMeasurements["measurementSize"];
	measurementType: measurementType[];
	Ingredients: ingredients[];
};

type FullIngredientMeasurement = {
	recipeIngredientID: recipeIngredients["recipeIngredientID"];
	recipeID: recipeIngredients["recipeID"];
	ingredientMeasurementID: ingredientMeasurements["ingredientMeasurementID"];
	ingredientMeasurements: FullMeasurements[];
};

export {
	Count,
	IngredientDetails,
	FullIngredientMeasurement,
	FullMeasurements,
};
