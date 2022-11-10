import { deleteRecipesInstructions } from "./deleteRecipesInstructions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("deleteRecipesInstructions", () => {
  beforeEach(async () => {
    const newInstruction = await prisma.recipeSteps.create({
      data: {
        recipeID: 9,
        stepNumber: 3,
        stepText: "testing",
      },
    });
  });
  it("successful circumstance", async () => {
    const deletedInstructions = await deleteRecipesInstructions(9);

    if (deletedInstructions) {
      expect(typeof deletedInstructions).toBe("object");
      expect(deletedInstructions.count).toBeDefined();
    }
  });
});
