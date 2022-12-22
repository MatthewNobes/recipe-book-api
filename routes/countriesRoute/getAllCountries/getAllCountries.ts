import { Countries } from "@prisma/client";
import prisma from "../../../client";

export const getAllCountries = async (): Promise<Countries[]> => {
	const countries = await prisma.countries.findMany();
	return countries;
};
