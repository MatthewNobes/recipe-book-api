import { getRecipeFromID } from "./getRecipeFromID";

describe("getRecipeFromID", () => {
  it("successful circumstance", async () => {
    const recipe = await getRecipeFromID(1);

    if (recipe) {
      expect(typeof recipe).toBe("object");
      expect(recipe.RecipeID).toBeDefined();
      expect(recipe.RecipeName).toBeDefined();
      expect(recipe.RecipeDecsription).toBeDefined();
      // expect(recipe.RecipeDifficultyRating).toBeDefined();
      expect(recipe.RecipePrepTime).toBeDefined();
      expect(recipe.RecipeCookTime).toBeDefined();
      expect(recipe.ServingNumber).toBeDefined();
      // expect(recipe.RecipeSource).toBeDefined();
      expect(Array.isArray(recipe.Ingredients)).toBe(true);
    }
  });
});
