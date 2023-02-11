import { getMethodFromRecipeID } from "./getMethodFromRecipeID";
import { prismaMock } from "../../../singleton";
import { recipeSteps } from "@prisma/client";

describe("getMethodFromRecipeID", () => {
	const mockRecipeStepsData: recipeSteps[] = [
		{
			recipeStepID: 1,
			stepNumber: 1,
			stepText: "Test 1",
			recipeID: 1,
		},
		{
			recipeStepID: 2,
			stepNumber: 2,
			stepText: "Test 1",
			recipeID: 1,
		},
	];

	beforeEach(() => {
		prismaMock.recipeSteps.findMany.mockResolvedValue(mockRecipeStepsData);
	});

	it("should return the steps for recipe 1", async () => {
		const requestedRecipeID = 1;
		const requestedSteps = await getMethodFromRecipeID(requestedRecipeID);
		expect(requestedSteps).toStrictEqual(mockRecipeStepsData);
	});

	it("should return undefined when looking for steps for a recipe that has no steps", async () => {
		const requestedRecipeID = 1234;
		const requestedSteps = await getMethodFromRecipeID(requestedRecipeID);
		expect(requestedSteps).toBeUndefined();
	});
});
