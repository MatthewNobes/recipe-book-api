import prisma from "../../../client";
import { recipeSteps } from "@prisma/client";

/**
 * Gets a step from the unique ID of the step
 * @param stepID The requested step ID
 * @returns Promise<RecipeSteps | undefined> The requested step object or undefined if it cannot be found
 */
export const getStepFromRecipeStepID = async (
	stepID: number,
): Promise<recipeSteps | undefined> => {
	const step = await prisma.recipeSteps.findFirst({
		where: { recipeStepID: stepID },
	});

	if (step?.recipeStepID === stepID) {
		return step;
	} else {
		return undefined;
	}
};
