// file deepcode ignore ComparisonToNaN: its fucking annoying
import express from "express";
import { PrismaClient } from "@prisma/client";
import { getRecipeFromID } from "./";

const prisma = new PrismaClient();
let recipeRouter = express.Router();

/**
 * @swagger
 * /api/recipes/allRecipes:
 *   get:
 *     summary: Retrieve all the recipes
 *     description: Retrieve all the recipes in the system
 *     tags:
 *       - Recipes
 *     responses:
 *       200:
 *         description: All the recipes in the system
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       RecipeID:
 *                         type: integer
 *                         description: The recipes ID.
 *                         example: 1
 *                       RecipeName:
 *                         type: string
 *                         description: The name of the recipe.
 *                         example: Roast Chicken
 *                       RecipeDecsription:
 *                         type: string
 *                         description: The description of the recipe.
 *                         example: A nice roasted chicken with roast potatoes
 *                       RecipeDifficultyRating:
 *                         type: integer
 *                         description: The rating of difficulty the recipes is deemed out of ten
 *                         example: 5
 *                       RecipePrepTime:
 *                         type: string
 *                         description: The time required to prepare for this recipe
 *                         example: 0:30
 *                       RecipeCookTime:
 *                         type: string
 *                         description: The description of the recipe.
 *                         example: 1:10
 *                       ServingNumber:
 *                         type: integer
 *                         description: The number of people this will serve
 *                         example: 4
 *                       RecipeSource:
 *                         type: string
 *                         description: The source the recipe came from
 *                         example: https://www.bbcgoodfood.com/recipes/mustardy-salmon-beetroot-lentils
 */
recipeRouter.route("/allRecipes").get(async (request, result) => {
  const allRecipes = await prisma.recipes.findMany();
  result.json(allRecipes);
});

/**
 * @swagger
 * /api/recipes/recipe/{recipeID}:
 *   get:
 *     summary: Retrieve a recipe
 *     description: Retrieve specified recipe from its recipeID.
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: path
 *         name: recipeID
 *         required: true
 *         description: Numeric ID of the recipe to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The specified recipe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 RecipeID:
 *                   type: integer
 *                   description: The recipes ID.
 *                   example: 1
 *                 RecipeName:
 *                   type: string
 *                   description: The name of the recipe.
 *                   example: Roast Chicken
 *                 RecipeDecsription:
 *                   type: string
 *                   description: The description of the recipe.
 *                   example: A nice roasted chicken with roast potatoes
 *                 RecipeDifficultyRating:
 *                   type: integer
 *                   description: The rating of difficulty the recipes is deemed out of ten
 *                   example: 5
 *                 RecipePrepTime:
 *                   type: string
 *                   description: The time required to prepare for this recipe
 *                   example: 0:30
 *                 RecipeCookTime:
 *                   type: string
 *                   description: The description of the recipe.
 *                   example: 1:10
 *                 ServingNumber:
 *                   type: integer
 *                   description: The number of people this will serve
 *                   example: 4
 *                 RecipeSource:
 *                   type: string
 *                   description: The source the recipe came from
 *                   example: https://www.bbcgoodfood.com/recipes/mustardy-salmon-beetroot-lentils
 *                 Ingredients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ingredientMeasurementID:
 *                         type: integer
 *                         description: The ingredient measurement ID
 *                         example: 1
 *                       ingredient:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             ingredientID:
 *                               type: integer
 *                               description: The ingredient ID
 *                               example: 1
 *                             ingredientName:
 *                               type: string
 *                               description: The ingredient name of the ingredient
 *                               example: Turmeric
 *                             ingredientDescription:
 *                               type: string
 *                               description: The description of the ingredient
 *                               example: Turmeric powder has a warm, bitter, black pepper-like flavor and earthy, mustard-like aroma.
 *                             ingredientInfoURL:
 *                               type: string
 *                               description: The url to find more information about the ingredient
 *                               example: https://en.wikipedia.org/wiki/Turmeric
 *                       measurementSize:
 *                         type: string
 *                         description: The amount of the ingredient required
 *                         example: 500
 *                       measurementType:
 *                         type: object
 *                         properties:
 *                           measurementTypeID:
 *                             type: integer
 *                             description: The measurement type ID
 *                             example: 1
 *                           measurementType:
 *                             type: string
 *                             description: The measurement type
 *                             example: Grams
 */
recipeRouter.route("/recipe/:recipeID").get(async (request, result) => {
  const requestedRecipeID = parseInt(request.params.recipeID);

  try {
    const recipe = await getRecipeFromID(requestedRecipeID);

    if (recipe) {
      result.json(recipe);
    } else {
      throw "recipe not found";
    }
  } catch (error) {
    console.log(error);
    result.sendStatus(400);
  }
});

/**
 * @swagger
 * /api/recipes/add-recipe/{recipeName}-{recipeDescription}-{recipeDifficultyRating}-{recipePrepTime}-{recipeCookTime}-{servingNumber}-{recipeSource}:
 *   post:
 *     summary: Adds a new recipe
 *     description: Used to add a new recipe to the system.
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: path
 *         name: recipeName
 *         required: true
 *         description: The name of the recipe
 *         schema:
 *           type: string
 *       - in: path
 *         name: recipeDescription
 *         required: true
 *         description: A description of the recipe
 *         schema:
 *           type: string
 *       - in: path
 *         name: recipeDifficultyRating
 *         required: true
 *         description: The recipes difficulty rating
 *         schema:
 *           type: integer
 *       - in: path
 *         name: recipePrepTime
 *         required: true
 *         description: The preparation time for the recipe
 *         schema:
 *           type: string
 *       - in: path
 *         name: recipeCookTime
 *         required: true
 *         description: A cooking time required
 *         schema:
 *           type: string
 *       - in: path
 *         name: servingNumber
 *         required: true
 *         description: The number of servings this provides for
 *         schema:
 *           type: integer
 *       - in: path
 *         name: recipeSource
 *         required: false
 *         description: The source the recipe comes from
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: The specified recipe
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               value: "Recipe added"
 *
 */
recipeRouter
  .route(
    "/add-recipe/:recipeName-:recipeDescription-:recipeDifficultyRating-:recipePrepTime-:recipeCookTime-:servingNumber-:recipeSource"
  )
  .post(async (request, result) => {
    const recipeName = request.params.recipeName;
    const recipeDescription = request.params.recipeDescription;
    const recipeDifficultyRating = parseInt(
      request.params.recipeDifficultyRating
    );
    const recipePrepTime = request.params.recipePrepTime;
    const recipeCookTime = request.params.recipeCookTime;
    const servingNumber = parseInt(request.params.servingNumber);
    const recipeSource = request.params.recipeSource;

    if (
      recipeName === "" ||
      recipeDescription === "" ||
      recipeDifficultyRating === NaN ||
      recipePrepTime === "" ||
      recipeCookTime === ""
    ) {
      result.json("ERROR 1: Some required recipe parameters are missing");
    } else if (
      recipeName.length > 255 ||
      recipeDescription.length > 1024 ||
      recipeSource.length > 512
    ) {
      result.json(
        "ERROR 2: Some recipe parameters exceed the maximum allowed size"
      );
    } else {
      try {
        const newRecipe = await prisma.recipes.create({
          data: {
            RecipeName: recipeName,
            RecipeDecsription: recipeDescription,
            RecipeDifficultyRating: recipeDifficultyRating,
            RecipePrepTime: recipePrepTime,
            RecipeCookTime: recipeCookTime,
            ServingNumber: servingNumber,
            RecipeSource: recipeSource,
          },
        });
        result.status(201);
        result.json(newRecipe);
      } catch (error) {
        result.status(400);
        result.json(error);
      }
    }
  });

export default recipeRouter;
