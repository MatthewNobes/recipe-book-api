import { getAllCategories } from "./getAllCategories";
import { prismaMock } from "../../../singleton";
import { categories } from "@prisma/client";

describe("getAllCategories", () => {
	const mockCategoryData: categories[] = [
		{
			categoryID: 1,
			category: "Test 1",
		},
		{
			categoryID: 2,
			category: "Test 2",
		},
	];

	beforeEach(() => {
		prismaMock.categories.findMany.mockResolvedValue(mockCategoryData);
	});

	it("should return the mocked categories", async () => {
		const requestedCategories = await getAllCategories();
		expect(requestedCategories).toEqual(mockCategoryData);
	});
});
