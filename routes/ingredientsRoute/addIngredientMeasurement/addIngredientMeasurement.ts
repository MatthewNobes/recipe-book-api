import { ingredientMeasurements } from "@prisma/client";
import prisma from "../../../client";

export const addIngredientMeasurement = async (
	ingredientID: number,
	measurementTypeID: number,
	measurementSize: number,
): Promise<ingredientMeasurements | undefined> => {
	const newIngredientMeasurement = await prisma.ingredientMeasurements.create({
		data: {
			ingredientID: ingredientID,
			measurementTypeID: measurementTypeID,
			measurementSize: measurementSize,
		},
	});

	return newIngredientMeasurement;
};
