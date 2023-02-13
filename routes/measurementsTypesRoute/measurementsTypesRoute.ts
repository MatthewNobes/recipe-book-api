import express from "express";
import { getAllMeasurementTypes, addNewMeasurementType } from "./";

const router = express.Router();

/**
 * @swagger
 * /api/measurementTypes/measurementTypes:
 *   get:
 *     summary: Retrieve all the measurement types
 *     description: Retrieve all the measurement types in the system. E.g. Teaspoon, Grams, etc.
 *     tags:
 *       - Measurement Types
 *     responses:
 *       200:
 *         description: All the measurement types in the system
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
 *                       measurementTypeID:
 *                         type: integer
 *                         description: The measurement type ID.
 *                         example: 1
 *                       measurementType:
 *                         type: string
 *                         description: The name of the measurement type.
 *                         example: Teaspoon
 */
router.route("/measurementTypes").get(async (request, result) => {
	const allMeasurements = await getAllMeasurementTypes();
	result.json({ data: allMeasurements });
});

/**
 * @swagger
 * /api/measurementTypes/add/{measurementType}:
 *   post:
 *     summary: Adds a new measurement type
 *     description: Used to add a measurement type into the measurementType table
 *     tags:
 *       - Measurement Types
 *     parameters:
 *       - in: path
 *         name: measurementType
 *         required: true
 *         description: The measurement type to be added
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: The added measurement type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   measurementTypeID:
 *                     type: integer
 *                     description: The measurementTypeID.
 *                     example: 1
 *                   measurementType:
 *                     type: string
 *                     description: The measurement type added
 *                     example: Kilograms
 */
router.route("/add/:measurementType").post(async (request, result) => {
	try {
		const measurementType = request.params.measurementType;

		const newMeasurementType = await addNewMeasurementType(measurementType);

		if (newMeasurementType) {
			result.status(201);
			result.json({ data: newMeasurementType });
		} else {
			throw "Measurement type is not valid";
		}
	} catch (error) {
		result.status(400);
		result.json(error);
	}
});

export default router;
