import { Ingredients } from "@prisma/client";
import prisma from "../../../client";

export const getAllIngredients = async (): Promise<Ingredients[]> => {
	const ingredients = await prisma.ingredients.findMany();
	return ingredients;
};
