"use strict";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { getMethodFromRecipeID } from "./getMethodFromRecipeID/getMethodFromRecipeID";
import { doesRecipeExist } from "../recipesRoute/doesRecipeExist/doesRecipeExist";
import { getInstructionFromRecipeStepID } from "./getInstructionFromRecipeStepID/getInstructionFromRecipeStepID";

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
        result.json({ data: method });
      } else {
        throw "no method found";
      }
    } else {
      throw "no method found";
    }
  } catch (error) {
    result.status(400);
    result.json({ data: error });
  }
});

/**
 * @swagger
 * /api/method/instruction/{recipeStepID}:
 *   get:
 *     summary: Retrieve a specific instruction
 *     description: Retrieve a specific recipe instruction
 *     tags:
 *       - Method
 *     parameters:
 *       - in: path
 *         name: recipeStepID
 *         required: true
 *         description: Numeric ID of the instruction.
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
 *                   type: object
 *                   properties:
 *                     recipeStepID:
 *                       type: integer
 *                       description: The ID of the step.
 *                       example: 1
 *                     stepNumber:
 *                       type: integer
 *                       description: The number referring to the order of the instruction
 *                       example: 1
 *                     stepText:
 *                       type: string
 *                       description: The instruction text
 *                       example: Boil the kettle
 *                     recipeID:
 *                       type: integer
 *                       description: The recipes ID.
 *                       example: 1
 */
methodRouter
  .route("/instruction/:recipeStepID")
  .get(async (request, result) => {
    const recipeStepID = parseInt(request.params.recipeStepID);

    try {
      const method = await getInstructionFromRecipeStepID(recipeStepID);

      if (method) {
        result.json({ data: method });
      } else {
        throw "no instruction found";
      }
    } catch (error) {
      result.status(400);
      result.json({ data: error });
    }
  });

/**
 * @swagger
 * /api/method/add/{recipeID}/{stepNumber}/{stepText}:
 *   post:
 *     summary: Adds a new instruction
 *     description: Adds a new recipe instruction with an associated recipe ID and step number
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
 *           type: string
 *     responses:
 *       201:
 *         description: Confirmation of the instruction added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     recipeStepID:
 *                       type: integer
 *                       description: The ID of the step.
 *                       example: 1
 *                     stepNumber:
 *                       type: integer
 *                       description: The number referring to the order of the instruction
 *                       example: 1
 *                     stepText:
 *                       type: string
 *                       description: The instruction text
 *                       example: Boil the kettle
 *                     recipeID:
 *                       type: integer
 *                       description: The recipes ID.
 *                       example: 1
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
        const newInstruction = await prisma.recipeSteps.create({
          data: {
            recipeID: recipeID,
            stepNumber: stepNumber,
            stepText: stepText,
          },
        });

        result.status(201);
        result.json({ data: newInstruction });
      }
    } catch (error) {
      result.status(400);
      result.json({ data: error });
    }
  });

/**
 * @swagger
 * /api/method/instruction/{recipeStepID}:
 *   delete:
 *     summary: Removes a specific instruction
 *     description: Removes a specific recipe instruction
 *     tags:
 *       - Method
 *     parameters:
 *       - in: path
 *         name: recipeStepID
 *         required: true
 *         description: Numeric ID of the instruction.
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
 *                   type: object
 *                   properties:
 *                     recipeStepID:
 *                       type: integer
 *                       description: The ID of the step.
 *                       example: 1
 *                     stepNumber:
 *                       type: integer
 *                       description: The number referring to the order of the instruction
 *                       example: 1
 *                     stepText:
 *                       type: string
 *                       description: The instruction text
 *                       example: Boil the kettle
 *                     recipeID:
 *                       type: integer
 *                       description: The recipes ID.
 *                       example: 1
 */
methodRouter
  .route("/instruction/:recipeStepID")
  .delete(async (request, result) => {
    const recipeStepID = parseInt(request.params.recipeStepID);

    try {
      const instructionToDelete = await prisma.recipeSteps.delete({
        where: { recipeStepID: recipeStepID },
      });

      if (instructionToDelete) {
        result.json({ data: instructionToDelete });
      } else {
        throw "no instruction found";
      }
    } catch (error) {
      result.status(400);
      result.json({ data: error });
    }
  });

/**
 * @swagger
 * /api/method/instructionTextUpdate/{recipeStepID}/{stepText}:
 *   put:
 *     summary: Update the instruction text
 *     description: Updates the text for an instruction
 *     tags:
 *       - Method
 *     parameters:
 *       - in: path
 *         name: recipeStepID
 *         required: true
 *         description: Numeric ID of the instruction.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: stepText
 *         required: true
 *         description: The new instruction text
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The updated instruction
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     recipeStepID:
 *                       type: integer
 *                       description: The ID of the step.
 *                       example: 1
 *                     stepNumber:
 *                       type: integer
 *                       description: The number referring to the order of the instruction
 *                       example: 1
 *                     stepText:
 *                       type: string
 *                       description: The instruction text
 *                       example: Boil the kettle
 *                     recipeID:
 *                       type: integer
 *                       description: The recipes ID.
 *                       example: 1
 */
methodRouter
  .route("/instructionTextUpdate/:recipeStepID/:stepText")
  .put(async (request, result) => {
    const recipeStepID = parseInt(request.params.recipeStepID);
    const updatedStepText = request.params.stepText;

    try {
      const updatedInstruction = await prisma.recipeSteps.update({
        where: { recipeStepID: recipeStepID },
        data: { stepText: updatedStepText },
      });

      if (updatedInstruction) {
        result.json({ data: updatedInstruction });
      } else {
        throw "no instruction found";
      }
    } catch (error) {
      result.status(400);
      result.json({ data: error });
    }
  });

/**
 * @swagger
 * /api/method/instructionStepNumber/{recipeStepID}/{stepNumber}:
 *   put:
 *     summary: Update the instruction text
 *     description: Updates the text for an instruction
 *     tags:
 *       - Method
 *     parameters:
 *       - in: path
 *         name: recipeStepID
 *         required: true
 *         description: Numeric ID of the instruction.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: stepNumber
 *         required: true
 *         description: The new step number
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The updated instruction
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     recipeStepID:
 *                       type: integer
 *                       description: The ID of the step.
 *                       example: 1
 *                     stepNumber:
 *                       type: integer
 *                       description: The number referring to the order of the instruction
 *                       example: 1
 *                     stepText:
 *                       type: string
 *                       description: The instruction text
 *                       example: Boil the kettle
 *                     recipeID:
 *                       type: integer
 *                       description: The recipes ID.
 *                       example: 1
 */
methodRouter
  .route("/instructionStepNumber/:recipeStepID/:stepNumber")
  .put(async (request, result) => {
    const recipeStepID = parseInt(request.params.recipeStepID);
    const updatedStepNumber = parseInt(request.params.stepNumber);

    try {
      const updatedInstruction = await prisma.recipeSteps.update({
        where: { recipeStepID: recipeStepID },
        data: { stepNumber: updatedStepNumber },
      });

      if (updatedInstruction) {
        result.json({ data: updatedInstruction });
      } else {
        throw "no instruction found";
      }
    } catch (error) {
      result.status(400);
      result.json({ data: error });
    }
  });

export default methodRouter;
