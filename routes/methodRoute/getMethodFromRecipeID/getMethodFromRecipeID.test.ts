import { getMethodFromRecipeID } from "./getMethodFromRecipeID";

describe("getMethodFromRecipeID", () => {
	it("successful circumstance", async () => {
		const method = await getMethodFromRecipeID(1);

		if (method) {
			expect(Array.isArray(method)).toBe(true);
			expect(typeof method[0]).toBe("object");
			expect(method[0].recipeStepID).toBeDefined();
			expect(method[0].stepNumber).toBeDefined();
			expect(method[0].stepText).toBeDefined();
			expect(method[0].recipeID).toBeDefined();
		}
	});
});
