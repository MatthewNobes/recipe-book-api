import recipesRouter from "./recipesRoute/recipesRoute";
import ingredientsRouter from "./ingredientsRoute/ingredientsRoute";
import measurementsTypesRoute from "./measurementsTypesRoute/measurementsTypesRoute";
import methodRouter from "./methodRoute/methodRoute";
import countriesRouter from "./countriesRoute/countriesRoute";
import express from "express";
let router = express.Router();

router.use("/recipes", recipesRouter);
router.use("/ingredients", ingredientsRouter);
router.use("/measurementTypes", measurementsTypesRoute);
router.use("/method", methodRouter);
router.use("/countries", countriesRouter);

export default router;
