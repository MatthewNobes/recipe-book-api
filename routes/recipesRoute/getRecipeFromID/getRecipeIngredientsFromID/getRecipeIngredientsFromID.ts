import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getRecipeIngredientsFromID = async (requestedRecipeID: any) => {
	const recipeIngredientMeasurements = await prisma.recipeIngredients.findMany({
		where: { recipeID: requestedRecipeID },
	});

	return Promise.all(
		recipeIngredientMeasurements.map(
			async (recipeIngredientMeasurement: { ingredientMeasurementID: any }) => {
				const ingredientInformation = await getIngredientMeasurement(
					recipeIngredientMeasurement.ingredientMeasurementID,
				);
				return await ingredientInformation;
			},
		),
	);
};

export const getIngredientMeasurement = async (
	recipeIngredientMeasurementID: any,
) => {
	const ingredientMeasurement = await prisma.ingredientMeasurements.findFirst({
		where: { ingredientMeasurementID: recipeIngredientMeasurementID },
	});

	if (ingredientMeasurement) {
		const ingredientMeasurementType =
			await getMeasurementTypeFromMeasurementTypeID(
				ingredientMeasurement.measurementTypeID,
			);

		const ingredient = await getIngredientFromIngredientID(
			ingredientMeasurement.ingredientID,
		);

		const fullIngredientMeasurement = {
			ingredientMeasurementID: ingredientMeasurement.ingredientMeasurementID,
			ingredient: ingredient,
			measurementSize: ingredientMeasurement.measurementSize,
			measurementType: ingredientMeasurementType,
		};
		return fullIngredientMeasurement;
	}

	return null;
};

export const getIngredientFromIngredientID = async (ingredientID: any) => {
	const ingredient = await prisma.ingredients.findFirst({
		where: { ingredientID: ingredientID },
	});
	return ingredient;
};

export const getMeasurementTypeFromMeasurementTypeID = async (
	measurementTypeID: any,
) => {
	const measurementType = await prisma.measurementType.findFirst({
		where: { measurementTypeID: measurementTypeID },
	});
	return measurementType;
};
