import { recipeSteps } from "@prisma/client";
import prisma from "../../../client";

/**
 * Used to update a step's text
 * @param updatedStepText the updated text
 * @param recipeStepID the id of the step to update
 * @returns Promise<recipeSteps | undefined> either the recipe step that has been updated or undefined
 */
export const updateStepText = async (
	updatedStepText: string,
	recipeStepID: number,
): Promise<recipeSteps | undefined> => {
	if (
		updatedStepText === "" ||
		recipeStepID === 0 ||
		!Number.isInteger(recipeStepID) ||
		updatedStepText.length > 2048
	) {
		return undefined;
	}
	const updatedStep = await prisma.recipeSteps.update({
		where: { recipeStepID: recipeStepID },
		data: { stepText: updatedStepText },
	});

	return updatedStep;
};
