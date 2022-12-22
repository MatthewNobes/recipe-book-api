import { Countries } from "@prisma/client";
import prisma from "../../../client";

export const addNewCountry = async (
	country: string,
): Promise<Countries | undefined> => {
	if (country === "") {
		return undefined;
	}
	const newCountry = await prisma.countries.create({
		data: {
			country: country,
		},
	});

	return newCountry;
};
