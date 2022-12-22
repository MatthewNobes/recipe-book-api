import { deleteRecipesInstructions } from "./deleteRecipesInstructions";
import { prismaMock } from "../../../singleton";
import { Count } from "../../../interfaces";

describe("deleteRecipesInstructions", () => {
	describe("successful deletes", () => {
		const mockCount: Count = {
			count: 10,
		};

		beforeEach(() => {
			prismaMock.recipeSteps.deleteMany.mockResolvedValue(mockCount);
		});
		it("should return a count object containing count: 10", async () => {
			const deletedInstructionsCount = await deleteRecipesInstructions(1);

			if (deletedInstructionsCount) {
				expect(typeof deletedInstructionsCount).toBe("object");
				expect(deletedInstructionsCount.count).toBe(10);
			}
		});
	});
	describe("unsuccessful deletes", () => {
		const mockCount: Count = {
			count: 0,
		};

		beforeEach(() => {
			prismaMock.recipeSteps.deleteMany.mockResolvedValue(mockCount);
		});
		it("should return a count object containing count: 0, as nothing was deleted", async () => {
			const deletedInstructionsCount = await deleteRecipesInstructions(1);

			if (deletedInstructionsCount) {
				expect(typeof deletedInstructionsCount).toBe("object");
				expect(deletedInstructionsCount.count).toBe(0);
			}
		});
	});
});
