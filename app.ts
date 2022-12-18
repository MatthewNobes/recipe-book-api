import router from "./routes/index";
import express from "express";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "Recipe Book API",
		version: "0.0.1",
		description:
			"This is a REST API application made with Express for the recipe book system. It retrieves data from the database for the recipe book app.",
	},
};

const options = {
	swaggerDefinition,
	apis: ["**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use(cors());
app.use("/api", router);

app.get("/", (request, response) => {
	response.json("docs, maybe swagger, will go here");
});

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
