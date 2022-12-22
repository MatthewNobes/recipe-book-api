import { addNewMeasurementType } from "./addNewMeasurementType";
import { prismaMock } from "../../../singleton";
import { measurementType } from "@prisma/client";

describe("addNewMeasurementType", () => {
	const mockMeasurementTypeData: measurementType = {
		measurementTypeID: 1,
		measurementType: "Test 1",
	};

	beforeEach(() => {
		prismaMock.measurementType.create.mockResolvedValue(
			mockMeasurementTypeData,
		);
	});

	it("should add the new ingredient Test 1", async () => {
		const newMeasurementType = await addNewMeasurementType("Test 1");
		expect(newMeasurementType).toStrictEqual(mockMeasurementTypeData);
	});

	it("should return undefined if blank is passed in as the ingredient name", async () => {
		const newMeasurementType = await addNewMeasurementType("");
		expect(newMeasurementType).toBeUndefined();
	});
});
