import express from "express";
import {
	getMethodFromRecipeID,
	deleteRecipesInstructions,
	getStepFromRecipeStepID,
	addNewStep,
	deleteStep,
	updateStepText,
	updateStepNumber,
} from "./";

const methodRouter = express.Router();

/**
 * @swagger
 * /api/method/method/{recipeID}:
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
methodRouter.route("/method/:recipeID").get(async (request, result) => {
	const requestedRecipeID = parseInt(request.params.recipeID);

	try {
		const method = await getMethodFromRecipeID(requestedRecipeID);

		if (
			method &&
			method.length >= 1 &&
			method[0].recipeID === requestedRecipeID
		) {
			result.json({ data: method });
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
 * /api/method/step/{recipeStepID}:
 *   get:
 *     summary: Retrieve a specific step
 *     description: Retrieve a specific recipe step
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
methodRouter.route("/step/:recipeStepID").get(async (request, result) => {
	const recipeStepID = parseInt(request.params.recipeStepID);

	try {
		const method = await getStepFromRecipeStepID(recipeStepID);

		if (method && method.recipeStepID === recipeStepID) {
			result.json({ data: method });
		} else {
			throw "no steps found";
		}
	} catch (error) {
		result.status(400);
		result.json({ data: error });
	}
});

/**
 * @swagger
 * /api/method/step/add/{recipeID}/{stepNumber}/{stepText}:
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
	.route("/step/add/:recipeID/:stepNumber/:stepText")
	.post(async (request, result) => {
		const recipeID: number = parseInt(request.params.recipeID);
		const stepNumber: number = parseInt(request.params.stepNumber);
		const stepText: string = request.params.stepText;

		try {
			const newStep = await addNewStep(stepText, stepNumber, recipeID);

			if (newStep === undefined) {
				throw "Invalid parameters";
			}
			result.status(201);
			result.json({ data: newStep });
		} catch (error) {
			result.status(400);
			result.json({ data: error });
		}
	});

/**
 * @swagger
 * /api/method/delete/{recipeStepID}:
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
	.route("/step/delete/:recipeStepID")
	.delete(async (request, result) => {
		const recipeStepID = parseInt(request.params.recipeStepID);

		try {
			const deletedInstruction = await deleteStep(recipeStepID);

			if (deletedInstruction) {
				result.json({ data: deletedInstruction });
			} else {
				throw "invalid recipeStepID";
			}
		} catch (error) {
			result.status(400);
			result.json({ data: error });
		}
	});

/**
 * @swagger
 * /api/method/method/delete/{recipeID}:
 *   delete:
 *     summary: Removes all the instructions for a recipe
 *     description: Removes all the instructions for a recipe.
 *     tags:
 *       - Method
 *     parameters:
 *       - in: path
 *         name: recipeID
 *         required: true
 *         description: Numeric ID of the recipe.
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
 *                     count:
 *                       type: integer
 *                       description: The number of records removed
 *                       example: 1
 */
methodRouter
	.route("/method/delete/:recipeID")
	.delete(async (request, result) => {
		const recipeID = parseInt(request.params.recipeID);

		try {
			const countOfDeletedRecords = await deleteRecipesInstructions(recipeID);

			if (countOfDeletedRecords && countOfDeletedRecords.count > 0) {
				result.json({ data: countOfDeletedRecords });
			} else {
				throw "invalid parameter";
			}
		} catch (error) {
			result.status(400);
			result.json({ data: error });
		}
	});

/**
 * @swagger
 * /api/method/step/update/stepText/{recipeStepID}/{stepText}:
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
	.route("/step/update/stepText/:recipeStepID/:stepText")
	.put(async (request, result) => {
		const recipeStepID = parseInt(request.params.recipeStepID);
		const updatedStepText = request.params.stepText;

		try {
			const updatedStep = await updateStepText(updatedStepText, recipeStepID);

			if (updatedStep) {
				result.json({ data: updatedStep });
			} else {
				throw "no step found";
			}
		} catch (error) {
			result.status(400);
			result.json({ data: error });
		}
	});

/**
 * @swagger
 * /step/update/stepNumber/{recipeStepID}/{stepNumber}:
 *   put:
 *     summary: Update the instruction number
 *     description: Updates the number for an instruction
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
	.route("/step/update/stepNumber/:recipeStepID/:stepNumber")
	.put(async (request, result) => {
		const recipeStepID = parseInt(request.params.recipeStepID);
		const updatedStepNumber = parseInt(request.params.stepNumber);

		try {
			const updatedStep = await updateStepNumber(
				updatedStepNumber,
				recipeStepID,
			);

			if (updatedStep) {
				result.json({ data: updatedStep });
			} else {
				throw "no step found";
			}
		} catch (error) {
			result.status(400);
			result.json({ data: error });
		}
	});

export default methodRouter;
