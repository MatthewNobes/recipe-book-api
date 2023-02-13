import { updateStepNumber } from "./updateStepNumber";
import { prismaMock } from "../../../singleton";
import { recipeSteps } from "@prisma/client";

describe("updateStepNumber", () => {
	const mockRecipeStepsData: recipeSteps = {
		recipeStepID: 1,
		stepNumber: 2,
		stepText: "Text",
		recipeID: 1,
	};

	beforeEach(() => {
		prismaMock.recipeSteps.update.mockResolvedValue(mockRecipeStepsData);
	});

	it("should update the step text", async () => {
		const updatedStepNumber = 2;
		const recipeStepID = 1;
		const updatedStep = await updateStepNumber(updatedStepNumber, recipeStepID);
		expect(updatedStep).toStrictEqual(mockRecipeStepsData);
	});

	it("should return undefined if zero is passed in for the step number", async () => {
		const updatedStepNumber = 0;
		const recipeStepID = 1;
		const updatedStep = await updateStepNumber(updatedStepNumber, recipeStepID);
		expect(updatedStep).toBeUndefined();
	});

	it("should return undefined if a 0 value is passed in for recipeStepID", async () => {
		const updatedStepNumber = 2;
		const recipeStepID = 0;
		const updatedStep = await updateStepNumber(updatedStepNumber, recipeStepID);
		expect(updatedStep).toBeUndefined();
	});

	it("should return undefined if a decimal is passed in for recipeID", async () => {
		const updatedStepNumber = 2;
		const recipeStepID = 1.7;
		const updatedStep = await updateStepNumber(updatedStepNumber, recipeStepID);
		expect(updatedStep).toBeUndefined();
	});
});
