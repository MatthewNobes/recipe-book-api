import { Catagories } from "@prisma/client";
import prisma from "../../../client";

export const getAllCategories = async (): Promise<Catagories[]> => {
	const categories = await prisma.catagories.findMany();
	return categories;
};
