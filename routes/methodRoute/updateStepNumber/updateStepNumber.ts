import { recipeSteps } from "@prisma/client";
import prisma from "../../../client";

/**
 * Used to update the number of a step
 * @param updatedStepNumber the step number to update with
 * @param recipeStepID the id the step to update
 * @returns Promise<recipeSteps | undefined> either the updated step or undefined
 */
export const updateStepNumber = async (
	updatedStepNumber: number,
	recipeStepID: number,
): Promise<recipeSteps | undefined> => {
	if (
		updatedStepNumber === 0 ||
		recipeStepID === 0 ||
		!Number.isInteger(recipeStepID)
	) {
		return undefined;
	}
	const updatedStep = await prisma.recipeSteps.update({
		where: { recipeStepID: recipeStepID },
		data: { stepNumber: updatedStepNumber },
	});

	return updatedStep;
};
