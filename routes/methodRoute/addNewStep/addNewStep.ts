import { recipeSteps } from "@prisma/client";
import prisma from "../../../client";

/**
 * To add a new step
 * @param stepText the text of the step to add
 * @param stepNumber the number in the method that the step is
 * @param recipeID the id of the recipe this step is for
 * @returns Promise<RecipeSteps | undefined> the created step object or undefined
 */
export const addNewStep = async (
	stepText: string,
	stepNumber: number,
	recipeID: number,
): Promise<recipeSteps | undefined> => {
	if (
		stepText === "" ||
		stepNumber === 0 ||
		recipeID === 0 ||
		!Number.isInteger(stepNumber) ||
		!Number.isInteger(recipeID) ||
		stepText.length > 2048
	) {
		return undefined;
	}
	const newStep = await prisma.recipeSteps.create({
		data: {
			recipeID: recipeID,
			stepText: stepText,
			stepNumber: stepNumber,
		},
	});

	return newStep;
};
