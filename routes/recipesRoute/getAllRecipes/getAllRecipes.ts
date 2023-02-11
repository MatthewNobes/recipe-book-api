import { recipes } from "@prisma/client";
import prisma from "../../../client";

export const getAllRecipes = async (): Promise<recipes[]> => {
	const recipes = await prisma.recipes.findMany();
	return recipes;
};
