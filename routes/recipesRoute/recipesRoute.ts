import express from "express";
import { getRecipeByID, addRecipe, getAllRecipes } from "./";

const recipeRouter = express.Router();

/**
 * @swagger
 * /api/recipes/recipes:
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
 *                       recipeID:
 *                         type: integer
 *                         description: The recipes ID.
 *                         example: 1
 *                       recipeName:
 *                         type: string
 *                         description: The name of the recipe.
 *                         example: Roast Chicken
 *                       recipeDescription:
 *                         type: string
 *                         description: The description of the recipe.
 *                         example: A nice roasted chicken with roast potatoes
 *                       recipeDifficultyRating:
 *                         type: integer
 *                         description: The rating of difficulty the recipes is deemed out of ten
 *                         example: 5
 *                       recipePrepTime:
 *                         type: string
 *                         description: The time required to prepare for this recipe
 *                         example: 0:30
 *                       recipeCookTime:
 *                         type: string
 *                         description: The description of the recipe.
 *                         example: 1:10
 *                       servingNumber:
 *                         type: integer
 *                         description: The number of people this will serve
 *                         example: 4
 *                       recipeSource:
 *                         type: string
 *                         description: The source the recipe came from
 *                         example: https://www.bbcgoodfood.com/recipes/mustardy-salmon-beetroot-lentils
 *                       categoryID:
 *                         type: integer
 *                         description: The ID of the recipes category
 *                         example: 5
 *                       countryID:
 *                         type: integer
 *                         description: The ID of the recipes country
 *                         example: 5
 *                       regionID:
 *                         type: integer
 *                         description: The id of the recipes region
 *                         example: 5
 */
recipeRouter.route("/recipes").get(async (request, result) => {
	const allRecipes = await getAllRecipes();
	result.json({ data: allRecipes });
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
 *                 recipeID:
 *                   type: integer
 *                   description: The recipes ID.
 *                   example: 1
 *                 recipeName:
 *                   type: string
 *                   description: The name of the recipe.
 *                   example: Roast Chicken
 *                 recipeDescription:
 *                   type: string
 *                   description: The description of the recipe.
 *                   example: A nice roasted chicken with roast potatoes
 *                 recipeDifficultyRating:
 *                   type: integer
 *                   description: The rating of difficulty the recipes is deemed out of ten
 *                   example: 5
 *                 recipePrepTime:
 *                   type: string
 *                   description: The time required to prepare for this recipe
 *                   example: 0:30
 *                 recipeCookTime:
 *                   type: string
 *                   description: The description of the recipe.
 *                   example: 1:10
 *                 ServingNumber:
 *                   type: integer
 *                   description: The number of people this will serve
 *                   example: 4
 *                 recipeSource:
 *                   type: string
 *                   description: The source the recipe came from
 *                   example: https://www.bbcgoodfood.com/recipes/mustardy-salmon-beetroot-lentils
 *                 categoryID:
 *                   type: integer
 *                   description: The ID of the recipes category
 *                   example: 5
 *                 countryID:
 *                   type: integer
 *                   description: The ID of the recipes country
 *                   example: 5
 *                 regionID:
 *                   type: integer
 *                   description: The id of the recipes region
 *                   example: 5
 */
recipeRouter.route("/recipe/:recipeID").get(async (request, result) => {
	const requestedRecipeID = parseInt(request.params.recipeID);

	try {
		const recipe = await getRecipeByID(requestedRecipeID);

		if (recipe && recipe.recipeID === requestedRecipeID) {
			result.json({ data: recipe });
		} else {
			throw "no recipe found";
		}
	} catch (error) {
		result.status(400);
		result.json({ data: error });
	}
});

/**
 * @swagger
 * /api/recipes/add/{recipeName}-{recipeDescription}-{recipeDifficultyRating}-{recipePrepTime}-{recipeCookTime}-{servingNumber}-{recipeSource}-{categoryID}-{countryID}-{regionID}:
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
 *         description: The encoded source of the recipe, URL's must be encoded as / will cause it to fail to find the route
 *         schema:
 *           type: string
 *       - in: path
 *         name: categoryID
 *         required: false
 *         description: The ID of the category this recipe lies within
 *         schema:
 *           type: integer
 *       - in: path
 *         name: countryID
 *         required: false
 *         description: The ID of the country this recipe is from
 *         schema:
 *           type: integer
 *       - in: path
 *         name: regionID
 *         required: false
 *         description: The ID of the region this recipe lies within
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: The created recipe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recipeID:
 *                   type: integer
 *                   description: The recipes ID.
 *                   example: 1
 *                 recipeName:
 *                   type: string
 *                   description: The name of the recipe.
 *                   example: Roast Chicken
 *                 recipeDescription:
 *                   type: string
 *                   description: The description of the recipe.
 *                   example: A nice roasted chicken with roast potatoes
 *                 recipeDifficultyRating:
 *                   type: integer
 *                   description: The rating of difficulty the recipes is deemed out of ten
 *                   example: 5
 *                 recipePrepTime:
 *                   type: string
 *                   description: The time required to prepare for this recipe
 *                   example: 0:30
 *                 recipeCookTime:
 *                   type: string
 *                   description: The description of the recipe.
 *                   example: 1:10
 *                 ServingNumber:
 *                   type: integer
 *                   description: The number of people this will serve
 *                   example: 4
 *                 recipeSource:
 *                   type: string
 *                   description: The source the recipe came from
 *                   example: https://www.bbcgoodfood.com/recipes/mustardy-salmon-beetroot-lentils
 *                 categoryID:
 *                   type: integer
 *                   description: The ID of the recipes category
 *                   example: 5
 *                 countryID:
 *                   type: integer
 *                   description: The ID of the recipes country
 *                   example: 3
 *                 regionID:
 *                   type: integer
 *                   description: The ID of the region
 *                   example: 2
 */
recipeRouter
	.route(
		"/add/:recipeName/:recipeDescription/:recipeDifficultyRating/:recipePrepTime/:recipeCookTime/:servingNumber/:recipeSource/:catagoryID/:countryID/:regionID",
	)
	.post(async (request, result) => {
		const recipeName = request.params.recipeName;
		const recipeDescription = request.params.recipeDescription;
		const recipeDifficultyRating = parseInt(
			request.params.recipeDifficultyRating,
		);
		const recipePrepTime = request.params.recipePrepTime;
		const recipeCookTime = request.params.recipeCookTime;
		const servingNumber = parseInt(request.params.servingNumber);
		const recipeSource = request.params.recipeSource;
		const categoryID = parseInt(request.params.catagoryID);
		const countryID = parseInt(request.params.countryID);
		const regionID = parseInt(request.params.regionID);

		try {
			const newRecipe = await addRecipe(
				recipeName,
				recipeDescription,
				servingNumber,
				recipeDifficultyRating,
				recipePrepTime,
				recipeCookTime,
				recipeSource,
				categoryID,
				countryID,
				regionID,
			);

			if (newRecipe) {
				result.status(201);
				result.json({ data: newRecipe });
			} else {
				throw "invalid parameters";
			}
		} catch (error) {
			result.status(400);
			result.json({ data: error });
		}
	});

export default recipeRouter;
