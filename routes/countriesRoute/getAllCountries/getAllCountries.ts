import { countries } from "@prisma/client";
import prisma from "../../../client";

export const getAllCountries = async (): Promise<countries[]> => {
	const countries = await prisma.countries.findMany();
	return countries;
};
