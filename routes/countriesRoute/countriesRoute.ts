import express from "express";
import { getAllCountries } from "./getAllCountries/getAllCountries";

let router = express.Router();

/**
 * @swagger
 * /api/countries/countries:
 *   get:
 *     summary: Retrieve all the countries
 *     description: Retrieve all the countries in the system
 *     tags:
 *       - Countries
 *     responses:
 *       200:
 *         description: All the countries in the system
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
 *                       countryID:
 *                         type: integer
 *                         description: The countryID.
 *                         example: 1
 *                       country:
 *                         type: string
 *                         description: The name of the countries
 *                         example: France
 */
router.route("/countries").get(async (request, result) => {
  const allCountries = await getAllCountries();
  result.json({ data: allCountries });
});

export default router;
