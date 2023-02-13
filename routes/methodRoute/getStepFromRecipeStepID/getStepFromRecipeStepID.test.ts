import { getStepFromRecipeStepID } from "./getStepFromRecipeStepID";
import { prismaMock } from "../../../singleton";
import { recipeSteps } from "@prisma/client";

describe("getStepFromRecipeStepID", () => {
	const mockRecipeStep: recipeSteps = {
		recipeStepID: 1,
		stepNumber: 1,
		stepText: "Test 1",
		recipeID: 1,
	};

	beforeEach(() => {
		prismaMock.recipeSteps.findFirst.mockResolvedValue(mockRecipeStep);
	});

	it("should return the mocked step", async () => {
		const requestedStepID = 1;
		const requestedStep = await getStepFromRecipeStepID(requestedStepID);
		expect(requestedStep).toStrictEqual(mockRecipeStep);
	});

	it("should return undefined when looking for a step that doesn't exist", async () => {
		const requestedStepID = 1234;
		const requestedStep = await getStepFromRecipeStepID(requestedStepID);
		expect(requestedStep).toBeUndefined();
	});
});
