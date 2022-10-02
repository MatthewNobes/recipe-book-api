import recipesRouter from "./recipesRoute/recipesRoute.mjs";
import ingredientsRouter from "./ingredientsRoute/ingredientsRoute.mjs";
import measurementsRouter from "./measurementsRoute/measurementsRoute.mjs";
import express from "express";
let router = express.Router();

router.use("/recipes", recipesRouter);
router.use("/ingredients", ingredientsRouter);
router.use("/measurements", measurementsRouter);

export default router;
