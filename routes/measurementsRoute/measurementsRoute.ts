"use strict";
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let router = express.Router();

router.route("/").get(async (request, result) => {
  const allMeasurements = await prisma.measurementType.findMany();
  result.json(allMeasurements);
});

export default router;
