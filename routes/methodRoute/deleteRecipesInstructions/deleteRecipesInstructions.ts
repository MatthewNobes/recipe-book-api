import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Used to delete all the instructions for a recipe from its recipe ID.
 * @param recipeID The recipe ID to be deleted
 * @returns A count object of the number of records that have been deleted
 */
export const deleteRecipesInstructions = async (recipeID: number) => {
  const instructionToDelete = await prisma.recipeSteps.deleteMany({
    where: {
      recipeID: {
        equals: recipeID,
      },
    },
  });

  return instructionToDelete;
};
