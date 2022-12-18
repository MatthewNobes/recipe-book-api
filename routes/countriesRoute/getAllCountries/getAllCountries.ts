import { Countries, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCountries = async (): Promise<Countries[]> => {
	const countries = await prisma.countries.findMany();
	return countries;
};
