import { getAllCategories } from "./getAllCategories";
import { prismaMock } from "../../../singleton";
import { Catagories } from "@prisma/client";

describe("getAllCategories", () => {
	const mockCategoryData: Catagories[] = [
		{
			catagoryID: 1,
			catagory: "Test 1",
		},
		{
			catagoryID: 2,
			catagory: "Test 2",
		},
	];

	beforeEach(() => {
		prismaMock.catagories.findMany.mockResolvedValue(mockCategoryData);
	});

	it("should return the mocked categories", async () => {
		const requestedCategories = await getAllCategories();
		expect(requestedCategories).toEqual(mockCategoryData);
	});
});
