"use strict";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { getRecipeFromID } from "./getRecipeFromID/getRecipeFromID.mjs";

const prisma = new PrismaClient();
let recipeRouter = express.Router();

recipeRouter.route("/allRecipes").get(async (request, result) => {
  const allRecipes = await prisma.recipe.findMany();
  result.json(allRecipes);
});

recipeRouter.route("/recipe/:recipeID").get(async (request, result) => {
  const requestedRecipeID = parseInt(request.params.recipeID);

  try {
    const recipe = await getRecipeFromID(requestedRecipeID);
    result.json(recipe);
  } catch (error) {
    console.log(error);
    result.sendStatus(400);
  }
});

recipeRouter
  .route(
    "/add-recipe/:recipeName-:recipeDescription-:recipeDifficultyRating-:recipePrepTime-:recipeCookTime-:servingNumber-:recipeSource"
  )
  .get(async (request, result) => {
    const recipeName = request.params.recipeName;
    const recipeDescription = request.params.recipeDescription;
    const recipeDifficultyRating = parseInt(
      request.params.recipeDifficultyRating
    );
    const recipePrepTime = parseInt(request.params.recipePrepTime);
    const recipeCookTime = parseInt(request.params.recipeCookTime);
    const servingNumber = parseInt(request.params.servingNumber);
    const recipeSource = request.params.recipeSource;

    if (
      recipeName === "" ||
      recipeDescription === "" ||
      recipeDifficultyRating === NaN ||
      recipePrepTime === NaN ||
      recipeCookTime === NaN
    ) {
      result.json("ERROR 1: Some required recipe parameters are missing");
    } else if (
      recipeName.length > 255 ||
      recipeDescription > 1024 ||
      recipeSource > 512
    ) {
      result.json(
        "ERROR 2: Some recipe parameters exceed the maximum allowed size"
      );
    } else {
      const newRecipe = await prisma.recipe.create({
        data: {
          recipeName: recipeName,
          recipeDecsription: recipeDescription,
          recipeDifficultyRating: recipeDifficultyRating,
          recipePrepTime: recipePrepTime,
          recipeCookTime: recipeCookTime,
          servingNumber: servingNumber,
          recipeSource: recipeSource,
        },
      });
      result.json(newRecipe);
    }
  });

export default recipeRouter;
