import express from "express";
import { getAllCategories } from "./";

const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retrieve all the categories
 *     description: Retrieve all the categories in the system
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: All the categories in the system
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
 *                       catagoriesID:
 *                         type: integer
 *                         description: The id of the categories.
 *                         example: 1
 *                       catagories:
 *                         type: string
 *                         description: The name of the categories
 *                         example: Dessert
 */
router.route("/").get(async (request, result) => {
	const allCategories = await getAllCategories();
	result.json({ data: allCategories });
});

export default router;
