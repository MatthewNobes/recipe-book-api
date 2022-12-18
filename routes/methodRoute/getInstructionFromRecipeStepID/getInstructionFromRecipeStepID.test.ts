import { getInstructionFromRecipeStepID } from "./getInstructionFromRecipeStepID";

describe("getInstructionFromRecipeStepID", () => {
	it("successful circumstance", async () => {
		const instruction = await getInstructionFromRecipeStepID(1);

		if (instruction) {
			expect(typeof instruction).toBe("object");
			expect(instruction.recipeStepID).toBeDefined();
			expect(instruction.stepNumber).toBeDefined();
			expect(instruction.stepText).toBeDefined();
			expect(instruction.recipeID).toBeDefined();
		}
	});
});
