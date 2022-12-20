import express from "express";
import { getAllIngredients, addNewIngredient } from "./";

let router = express.Router();

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
 * /api/ingredients/add/{ingredientName}/{ingredientDescription}/{ingredientInfoURL}:
 *   post:
 *     summary: Adds a new ingredient
 *     description: Used to add an ingredient to the database. YET TO BE COMPLETED
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
 *         description: The recipes difficulty rating
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: All the ingredients in the system
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   ingredientID:
 *                     type: integer
 *                     description: The ingredientID.
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
 *                     example: 5
 */
router
	.route("/add/:ingredientName/:ingredientDescription/:ingredientInfoURL")
	.post(async (request, result) => {
		try {
			const ingredientName = request.params.ingredientName;
			const ingredientDescription = request.params.ingredientDescription;
			const ingredientInfoURL = request.params.ingredientInfoURL;

			const newIngredient = await addNewIngredient(
				ingredientName,
				ingredientDescription,
				ingredientInfoURL,
			);

			if (newIngredient) {
				result.status(201);
				result.json({ data: newIngredient });
			} else {
				throw "Ingredient name is not valid";
			}
		} catch (error) {
			result.status(400);
			result.json(error);
		}
	});

export default router;
