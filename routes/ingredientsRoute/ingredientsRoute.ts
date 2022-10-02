"use strict";
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let router = express.Router();

router.route("/").get(async (request, result) => {
  const allIngredients = await prisma.ingredients.findMany();
  result.json(allIngredients);
});

router
  .route(
    "/add-ingredient/:ingredientName-:ingredientDescription-:ingredientInfoURL-:quantity-:measurement-:recipe"
  )
  .get(async (request, result) => {
    //call should be executed after a recipe had been created

    //const allIngredients = await prisma.ingredients.findMany();
    //result.json(allIngredients);
    const ingredientName = request.params.ingredientName;
    const ingredientDescription = request.params.ingredientDescription;
    const ingredientInfoURL = request.params.ingredientInfoURL;
    const quantity = request.params.quantity;
    const measurement = request.params.measurement;
    const recipeToLinkTo = request.params.recipe;

    if (ingredientName) {
      //check if ingredient already in system, if not add it here
      //add to ingredients table
    }

    if (measurement) {
      //if the measurement is not already in (teaspoon etc.) add it here
      //add to measurements type table
    }

    if (quantity) {
      //if the ingredient already exists and the measurement already exists, then check if this exact quantity of this ingredient and measurement has been done before.
      //if not add to ingredient measurement table
    }

    if (recipeToLinkTo) {
      //double check that this ingredientMeasurement has not already been linked to this recipe, provided is hasn't
      //add this to the recipeIngredients table, linking to the recipe
    }

    result.json(
      ingredientName +
        ingredientDescription +
        ingredientInfoURL +
        quantity +
        measurement +
        recipeToLinkTo
    );
  });

export default router;
