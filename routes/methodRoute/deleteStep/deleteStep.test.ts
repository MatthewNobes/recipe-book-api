import { deleteStep } from "./deleteStep";
import { prismaMock } from "../../../singleton";
import { recipeSteps } from "@prisma/client";

describe("deleteStep", () => {
	describe("successful delete", () => {
		const mockDeletedStep: recipeSteps = {
			recipeStepID: 1,
			stepNumber: 2,
			stepText: "Step 1",
			recipeID: 1,
		};

		beforeEach(() => {
			prismaMock.recipeSteps.delete.mockResolvedValue(mockDeletedStep);
		});

		it("should return the deleted step object", async () => {
			const stepID = 1;
			const newStep = await deleteStep(stepID);
			expect(newStep).toStrictEqual(mockDeletedStep);
		});
	});
	describe("unsuccessful delete", () => {
		it("should return undefined if the step ID could not be found", async () => {
			const stepID = 123;
			const newStep = await deleteStep(stepID);
			expect(newStep).toBeUndefined();
		});

		it("should return undefined if the step ID is zero", async () => {
			const stepID = 0;
			const newStep = await deleteStep(stepID);
			expect(newStep).toBeUndefined();
		});

		it("should return undefined if the step ID is decimal", async () => {
			const stepID = 12.3;
			const newStep = await deleteStep(stepID);
			expect(newStep).toBeUndefined();
		});
	});
});
