import { Countries, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCountryByID = async (id: number): Promise<Countries | null> => {
	const country = await prisma.countries.findUnique({
		where: {
			countryID: id,
		},
	});
	return country;
};
