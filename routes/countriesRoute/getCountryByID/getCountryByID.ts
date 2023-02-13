import { countries } from "@prisma/client";
import prisma from "../../../client";

export const getCountryByID = async (
	id: number,
): Promise<countries | undefined> => {
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
