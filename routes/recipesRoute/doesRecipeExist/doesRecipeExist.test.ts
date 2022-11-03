import { doesRecipeExist } from "./doesRecipeExist";

describe("successful circumstances", () => {
  it("should return true for the recipeID 1", async () => {
    const recipeID = 1;
    const doesItExist = await doesRecipeExist(recipeID);

    expect(doesItExist).toBe(true);
  });
});

describe("unsuccessful circumstances", () => {
  it("should return false for the recipeID 99999", async () => {
    const recipeID = 99999;
    const doesItExist = await doesRecipeExist(recipeID);

    expect(doesItExist).toBe(false);
  });
});
