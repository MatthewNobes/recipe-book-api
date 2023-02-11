/* eslint-disable @typescript-eslint/ban-types */
import {
	recipeIngredients,
	ingredientMeasurements,
	ingredients,
	measurementType,
} from "@prisma/client";
import prisma from "../../../client";

export const getIngredientsByRecipeID = async (
	recipeID: number,
): Promise<Object[] | undefined> => {
	const recipeIngredients = await prisma.recipeIngredients.findMany({
		where: { recipeID: recipeID },
		select: {
			recipeIngredientID: true,
			recipeID: true,
			ingredientMeasurements: {
				select: {
					ingredientMeasurementID: true,
					measurementSize: true,
					measurementType: {
						select: {
							measurementTypeID: true,
							measurementType: true,
						},
					},
					Ingredients: {
						select: {
							ingredientID: true,
							ingredient: true,
							ingredientDescription: true,
							ingredientInfoURL: true,
						},
					},
				},
			},
		},
	});

	if (recipeIngredients) {
		return recipeIngredients;
	} else {
		return undefined;
	}
};

export const getRecipeIngredientsByRecipeID = async (
	recipeID: number,
): Promise<recipeIngredients[]> => {
	const recipeIngredients = await prisma.recipeIngredients.findMany({
		where: { recipeID: recipeID },
	});
	return recipeIngredients;
};

export const getIngredientMeasurements = async (
	ingredientMeasurementID: number,
): Promise<ingredientMeasurements | undefined> => {
	const ingredientMeasurement = await prisma.ingredientMeasurements.findUnique({
		where: { ingredientMeasurementID: ingredientMeasurementID },
	});
	if (ingredientMeasurement) {
		return ingredientMeasurement;
	} else {
		return undefined;
	}
};

export const getIngredient = async (
	ingredientID: number,
): Promise<ingredients | undefined> => {
	const ingredient = await prisma.ingredients.findUnique({
		where: { ingredientID: ingredientID },
	});
	if (ingredient) {
		return ingredient;
	} else {
		return undefined;
	}
};

export const getMeasurementType = async (
	measurementTypeID: number,
): Promise<measurementType | undefined> => {
	const measurementType = await prisma.measurementType.findUnique({
		where: { measurementTypeID: measurementTypeID },
	});
	if (measurementType) {
		return measurementType;
	} else {
		return undefined;
	}
};
