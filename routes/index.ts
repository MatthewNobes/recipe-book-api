import recipesRouter from "./recipesRoute/recipesRoute";
import ingredientsRouter from "./ingredientsRoute/ingredientsRoute";
import measurementsTypesRoute from "./measurementsTypesRoute/measurementsTypesRoute";
import methodRouter from "./methodRoute/methodRoute";
import countriesRouter from "./countriesRoute/countriesRoute";
import categoriesRouter from "./categoriesRoute/categoriesRoute";
import regionsRoute from "./regionsRoute/regionsRoute";
import express from "express";
const router = express.Router();

router.use("/recipes", recipesRouter);
router.use("/ingredients", ingredientsRouter);
router.use("/measurementTypes", measurementsTypesRoute);
router.use("/method", methodRouter);
router.use("/countries", countriesRouter);
router.use("/categories", categoriesRouter);
router.use("/regions", regionsRoute);

export default router;
