import { Recipes } from "@prisma/client";
import prisma from "../../../client";

export const getAllRecipes = async (): Promise<Recipes[]> => {
	const recipes = await prisma.recipes.findMany();
	return recipes;
};
