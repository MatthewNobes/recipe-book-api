import express from "express";
import { getAllCountries } from "./getAllCountries/getAllCountries";
import { getCountryByID } from "./getCountryByID/getCountryByID";

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

/**
 * @swagger
 * /api/countries/country/{countryID}:
 *   get:
 *     summary: Retrieve a specific country
 *     description: Retrieve a specific country
 *     tags:
 *       - Countries
 *     parameters:
 *       - in: path
 *         name: countryID
 *         required: true
 *         description: Numeric ID of the country.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The specified country
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     countryID:
 *                       type: integer
 *                       description: The ID of the country
 *                       example: 1
 *                     country:
 *                       type: string
 *                       description: The name of the country
 *                       example: France
 */
router.route("/country/:countryID").get(async (request, result) => {
  const countryID = parseInt(request.params.countryID);
  const country = await getCountryByID(countryID);

  if (country) {
    result.json({ data: country });
  } else {
    result.status(400);
    result.json({ data: "no country found" });
  }
});

export default router;
