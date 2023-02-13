import {
	getIngredientsByRecipeID,
	getRecipeIngredientsByRecipeID,
	getIngredientMeasurements,
	getIngredient,
	getMeasurementType,
} from "./getIngredientsByRecipeID";
import { prismaMock } from "../../../singleton";
import {
	ingredientMeasurements,
	ingredients,
	measurementType,
	recipeIngredients,
} from "@prisma/client";
import {
	FullIngredientMeasurement,
	FullMeasurements,
} from "../../../interfaces";

describe("getIngredientsByRecipeID", () => {
	const mockIngredient: ingredients = {
		ingredientID: 1,
		ingredient: "Cumin",
		ingredientDescription: "Hello world",
		ingredientInfoURL: "www.google.com",
	};

	const mockMeasurementType: measurementType = {
		measurementTypeID: 1,
		measurementType: "Teaspoons",
	};

	const mockIngredientMeasurements: FullMeasurements = {
		ingredientMeasurementID: 1,
		measurementSize: 2,
		measurementType: [mockMeasurementType],
		Ingredients: [mockIngredient],
	};

	const mockRecipeIngredients: FullIngredientMeasurement[] = [
		{
			recipeIngredientID: 45,
			recipeID: 1,
			ingredientMeasurementID: 1,
			ingredientMeasurements: [mockIngredientMeasurements],
		},
	];

	beforeEach(() => {
		prismaMock.recipeIngredients.findMany.mockResolvedValue(
			mockRecipeIngredients,
		);
	});

	it("should return the mocked ingredients", async () => {
		const recipeID = 1;
		const requestedIngredients = await getIngredientsByRecipeID(recipeID);
		expect(requestedIngredients).toEqual(mockRecipeIngredients);
	});
});

describe("getRecipeIngredientsByRecipeID", () => {
	const mockRecipeIngredients: recipeIngredients[] = [
		{
			recipeIngredientID: 1,
			recipeID: 1,
			ingredientMeasurementID: 4,
		},
		{
			recipeIngredientID: 3,
			recipeID: 1,
			ingredientMeasurementID: 45,
		},
		{
			recipeIngredientID: 5,
			recipeID: 1,
			ingredientMeasurementID: 407,
		},
		{
			recipeIngredientID: 45,
			recipeID: 1,
			ingredientMeasurementID: 554,
		},
	];

	beforeEach(() => {
		prismaMock.recipeIngredients.findMany.mockResolvedValue(
			mockRecipeIngredients,
		);
	});

	it("should return the mocked recipe ingredients objects", async () => {
		const recipeID = 1;
		const requestedRecipeIngredients = await getRecipeIngredientsByRecipeID(
			recipeID,
		);
		expect(requestedRecipeIngredients).toEqual(mockRecipeIngredients);
	});
});

describe("getIngredientMeasurements", () => {
	const mockIngredientMeasurements: ingredientMeasurements = {
		ingredientMeasurementID: 1,
		measurementTypeID: 1,
		ingredientID: 1,
		measurementSize: 250,
	};

	beforeEach(() => {
		prismaMock.ingredientMeasurements.findUnique.mockResolvedValue(
			mockIngredientMeasurements,
		);
	});

	it("should return the mocked ingredient measurement object", async () => {
		const ingredientMeasurementID = 1;
		const requestedIngredientMeasurement = await getIngredientMeasurements(
			ingredientMeasurementID,
		);
		expect(requestedIngredientMeasurement).toEqual(mockIngredientMeasurements);
	});
});

describe("getIngredient", () => {
	const mockIngredient: ingredients = {
		ingredientID: 1,
		ingredient: "Cumin",
		ingredientDescription: "Hello world",
		ingredientInfoURL: "www.google.com",
	};

	beforeEach(() => {
		prismaMock.ingredients.findUnique.mockResolvedValue(mockIngredient);
	});

	it("should return the mocked ingredient object", async () => {
		const ingredientID = 1;
		const requestedIngredient = await getIngredient(ingredientID);
		expect(requestedIngredient).toEqual(mockIngredient);
	});
});

describe("getMeasurementType", () => {
	const mockMeasurementType: measurementType = {
		measurementTypeID: 1,
		measurementType: "Kilograms",
	};

	beforeEach(() => {
		prismaMock.measurementType.findUnique.mockResolvedValue(
			mockMeasurementType,
		);
	});

	it("should return the mocked ingredient object", async () => {
		const measurementTypeID = 1;
		const requestedIngredient = await getMeasurementType(measurementTypeID);
		expect(requestedIngredient).toEqual(mockMeasurementType);
	});
});
