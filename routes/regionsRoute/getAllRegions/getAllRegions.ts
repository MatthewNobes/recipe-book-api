import { regions } from "@prisma/client";
import prisma from "../../../client";

export const getAllRegions = async (): Promise<regions[]> => {
	const regions = await prisma.regions.findMany();
	return regions;
};
