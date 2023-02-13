import { categories } from "@prisma/client";
import prisma from "../../../client";

export const getAllCategories = async (): Promise<categories[]> => {
	const categories = await prisma.categories.findMany();
	return categories;
};
