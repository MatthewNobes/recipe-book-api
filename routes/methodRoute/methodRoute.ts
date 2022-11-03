"use strict";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { getMethodFromRecipeID } from "./getMethodFromRecipeID/getMethodFromRecipeID";
import { doesRecipeExist } from "../recipesRoute/doesRecipeExist/doesRecipeExist";

const prisma = new PrismaClient();
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

/**
 * @swagger
 * /api/method/add/:recipeID/:stepNumber/:stepText:
 *   post:
 *     summary: Retrieve a recipes method
 *     description: Retrieve a recipes method from its recipeID.
 *     tags:
 *       - Method
 *     parameters:
 *       - in: path
 *         name: recipeID
 *         required: true
 *         description: Numeric ID of the recipes this step will be linked to
 *         schema:
 *           type: integer
 *       - in: path
 *         name: stepNumber
 *         required: true
 *         description: The order number of the step
 *         schema:
 *           type: integer
 *       - in: path
 *         name: stepText
 *         required: true
 *         description: The steps instructions
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Confirmation of the instruction added
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
methodRouter
  .route("/add/:recipeID/:stepNumber/:stepText")
  .post(async (request, result) => {
    const recipeID: number = parseInt(request.params.recipeID);
    const stepNumber: number = parseInt(request.params.stepNumber);
    const stepText: string = request.params.stepText;

    try {
      if (
        Number.isNaN(recipeID) ||
        Number.isNaN(stepNumber) ||
        stepText === ""
      ) {
        throw "parameters must be valid";
      }
      if (stepText.length > 2048) {
        throw "step text exceeds max length";
      }
      const recipeExist = await doesRecipeExist(recipeID);
      if (!recipeExist) {
        throw "the recipeID does not exist";
      }
      if (stepNumber <= 0) {
        throw "invalid step number";
      } else {
        const newRecipe = await prisma.recipeSteps.create({
          data: {
            recipeID: recipeID,
            stepNumber: stepNumber,
            stepText: stepText,
          },
        });

        console.log(newRecipe);
        result.status(201);
        result.json("New instruction added");
      }
    } catch (error) {
      result.status(400);
      result.json(error);
    }
  });

export default methodRouter;
