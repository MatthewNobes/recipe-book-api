import { Countries } from "@prisma/client";
import prisma from "../../../client";

export const getCountryByID = async (
	id: number,
): Promise<Countries | undefined> => {
	const country = await prisma.countries.findUnique({
		where: {
			countryID: id,
		},
	});

	if (country?.countryID === id) {
		return country;
	} else {
		return undefined;
	}
};
