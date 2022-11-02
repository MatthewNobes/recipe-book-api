"use strict";
import express from "express";
import { getMethodFromRecipeID } from "./getMethodFromRecipeID/getMethodFromRecipeID";

let methodRouter = express.Router();

/**
 * @swagger
 * /api/method/recipesMethod/{recipeID}:
 *   get:
 *     summary: Retrieve a recipes method
 *     description: Retrieve a recipes method from its recipeID.
 *     tags:
 *       - Method
 *     parameters:
 *       - in: path
 *         name: recipeID
 *         required: true
 *         description: Numeric ID of the recipes method to retrieve.
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
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       recipeStepID:
 *                         type: integer
 *                         description: The ID of the step.
 *                         example: 1
 *                       stepNumber:
 *                         type: integer
 *                         description: The number referring to the order of the instruction
 *                         example: 1
 *                       stepText:
 *                         type: string
 *                         description: The instruction text
 *                         example: Boil the kettle
 *                       recipeID:
 *                         type: integer
 *                         description: The recipes ID.
 *                         example: 1
 */
methodRouter.route("/recipesMethod/:recipeID").get(async (request, result) => {
  const requestedRecipeID = parseInt(request.params.recipeID);

  try {
    const method = await getMethodFromRecipeID(requestedRecipeID);

    if (method) {
      if (method.length >= 1) {
        result.json(method);
      } else {
        throw "no method found";
      }
    } else {
      throw "no method found";
    }
  } catch (error) {
    console.log(error);
    result.sendStatus(400);
  }
});

export default methodRouter;
