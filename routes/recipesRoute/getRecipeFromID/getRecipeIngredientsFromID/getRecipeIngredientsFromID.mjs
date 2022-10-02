import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getRecipeIngredientsFromID = async (requestedRecipeID) => {
  const recipeIngredientMeasurements = await prisma.recipeIngredients.findMany({
    where: { recipeID: requestedRecipeID },
  });

  return Promise.all(
    recipeIngredientMeasurements.map(async (recipeIngredientMeasurement) => {
      const ingredientInformation = await getIngredientMeasurement(
        recipeIngredientMeasurement.ingredientMeasurementID
      );
      return await ingredientInformation;
    })
  );
};

export const getIngredientMeasurement = async (
  recipeIngredientMeasurementID
) => {
  const ingredientMeasurement = await prisma.ingredientMeasurement.findFirst({
    where: { ingredientMeasurementID: recipeIngredientMeasurementID },
  });

  const ingredientMeasurementType =
    await getMeasurementTypeFromMeasurementTypeID(
      ingredientMeasurement.measurementType
    );

  const ingredient = await getIngredientFromIngredientID(
    ingredientMeasurement.ingredientID
  );

  const fullIngredientMeasurement = {
    ingredientMeasurementID: ingredientMeasurement.ingredientMeasurementID,
    ingredient: ingredient,
    measurementSize: ingredientMeasurement.measurementSize,
    measurementType: ingredientMeasurementType,
  };
  return fullIngredientMeasurement;
};

export const getIngredientFromIngredientID = async (ingredientID) => {
  const ingredient = await prisma.ingredients.findFirst({
    where: { ingredientID: ingredientID },
  });
  return ingredient;
};

export const getMeasurementTypeFromMeasurementTypeID = async (
  measurementTypeID
) => {
  const measurementType = await prisma.measurementType.findFirst({
    where: { measurementTypeID: measurementTypeID },
  });
  return measurementType;
};
