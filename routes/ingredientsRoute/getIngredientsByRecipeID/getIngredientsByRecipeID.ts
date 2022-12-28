/* eslint-disable @typescript-eslint/ban-types */
import {
	RecipeIngredients,
	ingredientMeasurements,
	Ingredients,
	measurementType,
} from "@prisma/client";
import prisma from "../../../client";

export const getIngredientsByRecipeID = async (
	recipeID: number,
): Promise<Object[] | undefined> => {
	const recipeIngredients = await prisma.recipeIngredients.findMany({
		where: { recipeID: recipeID },
		select: {
			recipeIngredientsID: true,
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
							ingredientName: true,
							ingredientDescription: true,
							ingredientInfoURL: true,
						},
					},
				},
			},
		},
	});

	if (recipeIngredients) {
		console.log(recipeIngredients);
		return recipeIngredients;
	} else {
		return undefined;
	}

	/**
	const recipeIngredients = await getRecipeIngredientsByRecipeID(recipeID);

	if (recipeIngredients.length === 0) {
		return undefined;
	}

	const resultArray: FullIngredientMeasurement[] = await recipeIngredients.map(
		async (recipeIngredient) => {
			const fillerObject: FullIngredientMeasurement = {
				recipeIngredientID: 45,
				ingredientID: 1,
				ingredient: "Egg",
				ingredientDescription: "A chickens egg",
				ingredientInfoURL: "https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FEgg",
				quantity: 250,
				measurement: "Whole",
				recipeID: 1,
			};

			const ingredientMeasurement = await getIngredientMeasurements(
				recipeIngredient.ingredientMeasurementID,
			);
			//console.log(ingredientMeasurement);
			if (ingredientMeasurement) {
				const ingredient = await getIngredient(
					ingredientMeasurement.ingredientID,
				);
				//console.log(ingredient);
				const measurementType = await getMeasurementType(
					ingredientMeasurement.measurementTypeID,
				);
				//console.log(measurementType);
				if (ingredient && measurementType) {
					/**const resultObject: FullIngredientMeasurement = {
                        recipeIngredientID: recipeIngredient.recipeIngredientsID,
                        ingredientID: ingredient.ingredientID,
                        ingredient: ingredient.ingredientName,
                        ingredientDescription: ingredient.ingredientDescription,
                        ingredientInfoURL: ingredient.ingredientInfoURL,
                        quantity: ingredientMeasurement.measurementSize,
                        measurement: measurementType.measurementType,
                        recipeID: recipeIngredient.recipeID,
                    };

					return fillerObject;
				}
			}
			return fillerObject;
		},
	);
	return resultArray;
     */
};

export const getRecipeIngredientsByRecipeID = async (
	recipeID: number,
): Promise<RecipeIngredients[]> => {
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
): Promise<Ingredients | undefined> => {
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
