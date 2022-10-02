import recipesRouter from "./recipesRoute/recipesRoute";
import ingredientsRouter from "./ingredientsRoute/ingredientsRoute";
import measurementsRouter from "./measurementsRoute/measurementsRoute";
import express from "express";
let router = express.Router();

router.use("/recipes", recipesRouter);
router.use("/ingredients", ingredientsRouter);
router.use("/measurements", measurementsRouter);

export default router;
