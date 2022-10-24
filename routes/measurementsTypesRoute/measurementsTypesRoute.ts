"use strict";
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let router = express.Router();

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
  const allMeasurements = await prisma.measurementType.findMany();
  result.json(allMeasurements);
});

router.route("/add/:measurementType").post(async (request, result) => {
  const measurementType = request.params.measurementType;

  try {
    if (measurementType === "") {
      throw "Measurement type cannot be null or empty";
    } else {
      const newMeasurementType = await prisma.measurementType.create({
        data: {
          measurementType: measurementType,
        },
      });
      result.status(201);
      result.json(newMeasurementType);
    }
  } catch (error) {
    result.status(401);
    result.json(error);
  }
});

export default router;
