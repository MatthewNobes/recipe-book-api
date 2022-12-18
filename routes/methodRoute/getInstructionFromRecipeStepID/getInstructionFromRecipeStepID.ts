import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RecipeStep {
	recipeStepID: number;
	stepNumber: number;
	stepText: string;
	recipeID: number;
}

export const getInstructionFromRecipeStepID = async (recipeStepID: number) => {
	const steps = await prisma.recipeSteps.findFirst({
		where: { recipeStepID: recipeStepID },
	});

	if (steps) {
		const methodObj: RecipeStep = steps;
		return methodObj;
	}

	return null;
};
