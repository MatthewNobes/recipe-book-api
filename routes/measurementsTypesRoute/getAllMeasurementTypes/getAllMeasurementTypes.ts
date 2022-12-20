import { measurementType } from "@prisma/client";
import prisma from "../../../client";

/**
 * Used to get all measurement type
 * @returns Promise<measurementType[]>
 */
export const getAllMeasurementTypes = async (): Promise<measurementType[]> => {
	const measurementTypes = await prisma.measurementType.findMany();

	return measurementTypes;
};
