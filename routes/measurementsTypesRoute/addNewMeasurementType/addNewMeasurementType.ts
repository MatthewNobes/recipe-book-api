import { measurementType } from "@prisma/client";
import prisma from "../../../client";

/**
 * Used to add a new ingredient
 * @param measurementType The name of the required ingredient
 * @returns Promise<measurementType | undefined>
 */
export const addNewMeasurementType = async (
	measurementType: string,
): Promise<measurementType | undefined> => {
	if (measurementType === "") {
		return undefined;
	}
	const newMeasurementType = await prisma.measurementType.create({
		data: {
			measurementType: measurementType,
		},
	});

	return newMeasurementType;
};
