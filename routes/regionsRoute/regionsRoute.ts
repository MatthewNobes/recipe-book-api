import express from "express";
import { getAllRegions } from "./";

const router = express.Router();

/**
 * @swagger
 * /api/regions:
 *   get:
 *     summary: Retrieve all the regions
 *     description: Retrieve all the regions in the system
 *     tags:
 *       - Regions
 *     responses:
 *       200:
 *         description: All the regions in the system
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
 *                       regionID:
 *                         type: integer
 *                         description: The id of the region.
 *                         example: 1
 *                       region:
 *                         type: string
 *                         description: The name of the region
 *                         example: Asia
 */
router.route("/").get(async (request, result) => {
	const regions = await getAllRegions();
	result.json({ data: regions });
});

export default router;
