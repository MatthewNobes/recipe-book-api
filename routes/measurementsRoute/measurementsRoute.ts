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

export default router;
