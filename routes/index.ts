import recipesRouter from "./recipesRoute/recipesRoute";
import ingredientsRouter from "./ingredientsRoute/ingredientsRoute";
import measurementsTypesRoute from "./measurementsTypesRoute/measurementsTypesRoute";
import express from "express";
let router = express.Router();

router.use("/recipes", recipesRouter);
router.use("/ingredients", ingredientsRouter);
router.use("/measurementTypes", measurementsTypesRoute);

export default router;
