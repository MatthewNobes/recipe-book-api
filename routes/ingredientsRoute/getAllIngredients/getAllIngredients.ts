import { ingredients } from "@prisma/client";
import prisma from "../../../client";

export const getAllIngredients = async (): Promise<ingredients[]> => {
	const ingredients = await prisma.ingredients.findMany();
	return ingredients;
};
