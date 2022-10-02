import { getRecipeFromID } from "./getRecipeFromID";

describe("getRecipeFromID", () => {
  it("successful circumstance", async () => {
    const recipe = await getRecipeFromID(1);

    if (recipe) {
      expect(typeof recipe).toBe("object");
      expect(recipe.recipeID).toBeDefined();
      expect(recipe.recipeName).toBeDefined();
      expect(recipe.recipeDecsription).toBeDefined();
      // expect(recipe.recipeDifficultyRating).toBeDefined();
      expect(recipe.recipePrepTime).toBeDefined();
      expect(recipe.recipeCookTime).toBeDefined();
      expect(recipe.servingNumber).toBeDefined();
      // expect(recipe.recipeSource).toBeDefined();
      expect(Array.isArray(recipe.ingredients)).toBe(true);
    }
  });
});
