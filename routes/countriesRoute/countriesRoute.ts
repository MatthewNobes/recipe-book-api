import express from "express";
import { addNewCountry, getCountryByID, getAllCountries } from "./";

const router = express.Router();

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

	if (country && country.countryID === countryID) {
		result.json({ data: country });
	} else {
		result.status(400);
		result.json({ data: "no country found" });
	}
});

/**
 * @swagger
 * /api/countries/add/{country}:
 *   post:
 *     summary: Adds a new country
 *     description: Adds a new country
 *     tags:
 *       - Countries
 *     parameters:
 *       - in: path
 *         name: country
 *         required: true
 *         description: The country to add
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Confirmation of the country added
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
 *                       description: The ID of the country.
 *                       example: 1
 *                     country:
 *                       type: string
 *                       description: The country that has been added
 *                       example: France
 */
router.route("/add/:country").post(async (request, result) => {
	const country: string = request.params.country;

	try {
		const newCountry = await addNewCountry(country);
		if (newCountry === undefined) {
			throw "A country must be passed in";
		}

		result.status(201);
		result.json({ data: newCountry });
	} catch (error) {
		result.status(400);
		result.json({ data: error });
	}
});

export default router;
