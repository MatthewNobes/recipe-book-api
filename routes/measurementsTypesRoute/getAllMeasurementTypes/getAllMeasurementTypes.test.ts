import { getAllMeasurementTypes } from "./getAllMeasurementTypes";
import { prismaMock } from "../../../singleton";
import { measurementType } from "@prisma/client";

describe("getAllMeasurementTypes", () => {
	const mockMeasurementTypesData: measurementType[] = [
		{
			measurementTypeID: 1,
			measurementType: "Test 1",
		},
		{
			measurementTypeID: 2,
			measurementType: "Test 2",
		},
	];

	beforeEach(() => {
		prismaMock.measurementType.findMany.mockResolvedValue(
			mockMeasurementTypesData,
		);
	});

	it("should return the mocked measurement types", async () => {
		const requestedMeasurementTypes = await getAllMeasurementTypes();
		expect(requestedMeasurementTypes).toEqual(mockMeasurementTypesData);
	});
});
