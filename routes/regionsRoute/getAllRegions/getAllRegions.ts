import { Regions } from "@prisma/client";
import prisma from "../../../client";

export const getAllRegions = async (): Promise<Regions[]> => {
	const regions = await prisma.regions.findMany();
	return regions;
};
