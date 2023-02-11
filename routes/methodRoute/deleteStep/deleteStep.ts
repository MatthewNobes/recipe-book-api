import { recipeSteps } from "@prisma/client";
import prisma from "../../../client";

/**
 * Used to delete a step from its id
 * @param stepID the id of the step to delete
 * @returns Promise<RecipeSteps | undefined> either the step that has been deleted or undefined
 */
export const deleteStep = async (
	stepID: number,
): Promise<recipeSteps | undefined> => {
	if (stepID === 0 || !Number.isInteger(stepID)) {
		return undefined;
	}
	const deletedStep = await prisma.recipeSteps.delete({
		where: {
			recipeStepID: stepID,
		},
	});

	return deletedStep;
};
