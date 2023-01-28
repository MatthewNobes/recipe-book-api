import express from "express";
import { getAllIngredients, addFullIngredient } from "./";
import { getIngredientsByRecipeID } from "./getIngredientsByRecipeID/getIngredientsByRecipeID";

const router = express.Router();

/**
 * @swagger
 * /api/ingredients/ingredients:
 *   get:
 *     summary: Retrieve all the ingredients
 *     description: Retrieve all the ingredients in the system
 *     tags:
 *       - Ingredients
 *     responses:
 *       200:
 *         description: All the ingredients in the system
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
 *                       ingredientID:
 *                         type: integer
 *                         description: The ingredientID.
 *                         example: 1
 *                       ingredientName:
 *                         type: string
 *                         description: The name of the recipe.
 *                         example: Diced beef
 *                       ingredientDescription:
 *                         type: string
 *                         description: The description of the ingredient
 *                         example: Beef cut into 2cm chunks
 *                       ingredientInfoURL:
 *                         type: integer
 *                         description: The URL with information about the ingredient
 *                         example: 5
 */
router.route("/ingredients").get(async (request, result) => {
	const allIngredients = await getAllIngredients();
	result.json({ data: allIngredients });
});

/**
 * @swagger
 * /api/ingredients/recipe/{recipeID}:
 *   get:
 *     summary: Retrieve the ingredients for a recipe
 *     description: Retrieve all the ingredients for a recipe, including its full details
 *     tags:
 *       - Ingredients
 *     parameters:
 *       - in: path
 *         name: recipeID
 *         required: true
 *         description: The id of the recipe requested
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: All the ingredients and there details for the requested recipe
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
 *                       recipeIngredientsID:
 *                         type: integer
 *                         description: The ingredientID.
 *                         example: 1
 *                       recipeID:
 *                         type: integer
 *                         description: The name of the recipe.
 *                         example: Diced beef
 *                       ingredientMeasurements:
 *                         type: object
 *                         properties:
 *                           ingredientMeasurementID:
 *                             type: integer
 *                             description: The ID of the ingredient measurement
 *                             example: 1
 *                           measurementSize:
 *                             type: integer
 *                             description: The quantity of the ingredient
 *                             example: 250
 *                           measurementType:
 *                             type: object
 *                             properties:
 *                               measurementTypeID:
 *                                 type: integer
 *                                 description: The ID of the measurement unit
 *                                 example: 1
 *                               measurementType:
 *                                 type: string
 *                                 description: The measurement unit itself
 *                                 example: Kg
 *                           Ingredients:
 *                             type: object
 *                             properties:
 *                               ingredientID:
 *                                 type: integer
 *                                 description: The ID of the ingredient
 *                                 example: 1
 *                               ingredientName:
 *                                 type: string
 *                                 description: The name of the ingredient
 *                                 example: Cumin
 *                               ingredientDescription:
 *                                 type: string
 *                                 description: A description of the ingredient
 *                                 example: A spice
 *                               ingredientInfoURL:
 *                                 type: string
 *                                 description: An encoded URL with more information about the ingredient
 *                                 example: www.google.com
 */
router.route("/recipe/:recipeID").get(async (request, result) => {
	try {
		const recipeID = parseInt(request.params.recipeID);
		const fullIngredients = await getIngredientsByRecipeID(recipeID);
		if (fullIngredients) {
			result.json({ data: fullIngredients });
		} else {
			throw "no ingredients found";
		}
	} catch (error) {
		result.status(400);
		result.json(error);
	}
});

/**
 * @swagger
 * /api/ingredients/add/{ingredientName}/{ingredientDescription}/{ingredientInfoURL}/{recipeID}/{measurementTypeID}/{measurementSize}:
 *   post:
 *     summary: Adds a new ingredient
 *     description: Used to add an ingredient to the ingredients table
 *     tags:
 *       - Ingredients
 *     parameters:
 *       - in: path
 *         name: ingredientName
 *         required: true
 *         description: The name of the recipe
 *         schema:
 *           type: string
 *       - in: path
 *         name: ingredientDescription
 *         required: true
 *         description: A description of the recipe
 *         schema:
 *           type: string
 *       - in: path
 *         name: ingredientInfoURL
 *         required: true
 *         description: The encoded url for information about the ingredient
 *         schema:
 *           type: string
 *       - in: path
 *         name: recipeID
 *         required: true
 *         description: The id of the recipe this ingredient is for
 *         schema:
 *           type: integer
 *       - in: path
 *         name: measurementTypeID
 *         required: true
 *         description: The id of the measurement type
 *         schema:
 *           type: integer
 *       - in: path
 *         name: measurementSize
 *         required: true
 *         description: The amount of the ingredient required
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: The added ingredient
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   recipeIngredientID:
 *                     type: integer
 *                     description: The id of the linked ingredient to the recipe
 *                     example: 1
 *                   measurementSize:
 *                     type: integer
 *                     description: The amount of an ingredient needed
 *                     example: 230
 *                   measurementTypeID:
 *                     type: integer
 *                     description: The id of the measurement type
 *                     example: 1
 *                   recipeID:
 *                     type: integer
 *                     description: The id of the recipe the ingredient is linked to
 *                     example: 1
 *                   ingredientName:
 *                     type: string
 *                     description: The name of the recipe.
 *                     example: Diced beef
 *                   ingredientDescription:
 *                     type: string
 *                     description: The description of the ingredient
 *                     example: Beef cut into 2cm chunks
 *                   ingredientInfoURL:
 *                     type: integer
 *                     description: The URL with information about the ingredient
 *                     example: https%3A%2F%2Fwww.javascripttutorial.net%2Fjavascript-fetch-api%2F
 */
router
	.route(
		"/add/:ingredientName/:ingredientDescription/:ingredientInfoURL/:recipeID/:measurementTypeID/:measurementSize",
	)
	.post(async (request, result) => {
		try {
			const ingredientName = request.params.ingredientName;
			const ingredientDescription = request.params.ingredientDescription;
			const ingredientInfoURL = request.params.ingredientInfoURL;
			const recipeID = parseInt(request.params.recipeID);
			const measurementTypeID = parseInt(request.params.measurementTypeID);
			const measurementSize = parseInt(request.params.measurementSize);

			const newIngredient = await addFullIngredient(
				ingredientName,
				ingredientDescription,
				ingredientInfoURL,
				measurementTypeID,
				measurementSize,
				recipeID,
			);

			if (newIngredient) {
				result.status(201);
				result.json({ data: newIngredient });
			} else {
				throw "Ingredient parameters are not valid";
			}
		} catch (error) {
			result.status(400);
			result.json(error);
		}
	});

export default router;
