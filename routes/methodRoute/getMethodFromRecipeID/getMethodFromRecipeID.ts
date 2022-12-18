import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RecipeStep {
	recipeStepID: number;
	stepNumber: number;
	stepText: string;
	recipeID: number;
}

export const getMethodFromRecipeID = async (requestedRecipeID: number) => {
	const steps = await prisma.recipeSteps.findMany({
		where: { recipeID: requestedRecipeID },
	});

	if (steps) {
		const methodObj: RecipeStep[] = steps;
		return methodObj;
	}

	return null;
};
