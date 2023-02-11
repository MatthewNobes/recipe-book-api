import { addNewStep } from "./addNewStep";
import { prismaMock } from "../../../singleton";
import { recipeSteps } from "@prisma/client";

describe("addNewCountry", () => {
	const mockRecipeStepsData: recipeSteps = {
		recipeStepID: 1,
		stepNumber: 2,
		stepText: "Step 1",
		recipeID: 1,
	};

	beforeEach(() => {
		prismaMock.recipeSteps.create.mockResolvedValue(mockRecipeStepsData);
	});

	it("should add the new country Test 1", async () => {
		const stepText = "Step 1";
		const stepNumber = 2;
		const recipeID = 1;
		const newStep = await addNewStep(stepText, stepNumber, recipeID);
		expect(newStep).toStrictEqual(mockRecipeStepsData);
	});

	it("should return undefined if blank is passed in for the step text", async () => {
		const stepText = "";
		const stepNumber = 2;
		const recipeID = 1;
		const newStep = await addNewStep(stepText, stepNumber, recipeID);
		expect(newStep).toBeUndefined();
	});

	it("should return undefined if a 0 value is passed in for stepNumber", async () => {
		const stepText = "Step 1";
		const stepNumber = 0;
		const recipeID = 1;
		const newStep = await addNewStep(stepText, stepNumber, recipeID);
		expect(newStep).toBeUndefined();
	});

	it("should return undefined if a 0 value is passed in for recipeID", async () => {
		const stepText = "Step 1";
		const stepNumber = 2;
		const recipeID = 0;
		const newStep = await addNewStep(stepText, stepNumber, recipeID);
		expect(newStep).toBeUndefined();
	});

	it("should return undefined if a decimal is passed in for stepNumber", async () => {
		const stepText = "Step 1";
		const stepNumber = 4.5;
		const recipeID = 1;
		const newStep = await addNewStep(stepText, stepNumber, recipeID);
		expect(newStep).toBeUndefined();
	});

	it("should return undefined if a decimal is passed in for recipeID", async () => {
		const stepText = "Step 1";
		const stepNumber = 2;
		const recipeID = 0.5;
		const newStep = await addNewStep(stepText, stepNumber, recipeID);
		expect(newStep).toBeUndefined();
	});

	it("should return undefined if the stepText is over 2048 characters", async () => {
		const stepText =
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus ac urna nec ultrices. Sed pellentesque feugiat tortor ac porta. Quisque ut turpis finibus, aliquam enim vitae, euismod enim. Curabitur consectetur vel ipsum eget rutrum. Morbi hendrerit elit eros, et bibendum risus pulvinar eu. Suspendisse potenti. Praesent erat purus, facilisis at scelerisque eu, auctor eu nunc. Integer maximus congue accumsan. Duis vel orci ultrices, finibus lectus quis, tristique leo. Nam et rutrum tortor, vitae fermentum est. Pellentesque eleifend orci elit. Nam a dictum dui, id euismod lacus. Nullam porttitor ex viverra, congue metus vitae, ultrices erat. Fusce mollis eleifend tincidunt. Aenean id orci a massa scelerisque commodo. Nulla tellus ex, porta a bibendum quis, ornare vel libero. Aenean eu nisi nisl. Donec vulputate velit vitae nisi porttitor euismod. Pellentesque laoreet dui eget nisi lacinia tempor. Ut fermentum, lorem vel semper venenatis, ex elit efficitur sem, a laoreet turpis nisi in massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi. Nam porttitor malesuada venenatis. Integer consectetur risus massa, non egestas orci blandit sed. Integer scelerisque lacinia tellus, sed euismod orci tincidunt at. Pellentesque iaculis massa eu tempor laoreet. Mauris vitae vestibulum felis, et accumsan odio. Nunc ac vehicula justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque dignissim sem id mattis vulputate. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin rhoncus laoreet neque, feugiat sagittis purus. Nulla non nunc ex. Etiam sed purus ut sem consectetur luctus. Integer efficitur ultrices nibh, in vestibulum urna viverra eu. Proin interdum, lorem quis porta imperdiet, elit lectus ultricies sapien, dictum scelerisque arcu nisl nec lorem. Morbi laoreet posuere eros sit amet varius. Morbi sit amet auctor dui, non congue magna. Sed sed auctor est. Suspendisse molestie eleifend elementum. Proin ut eleifend sem, id ultrices sapien. Mauris ut gravida neque. Quisque hendrerit porttitor lacus, at sodales eros scelerisque eu. Sed blandit suscipit est eu auctor. Vestibulum consectetur, ipsum hendrerit vehicula efficitur, nisl purus dignissim mauris, sit amet euismod eros elit at est. Quisque quis enim velit. Mauris ut lectus id mauris vestibulum gravida aliquam eget nunc. Sed eget libero luctus, egestas mi quis, pellentesque sapien. Maecenas vestibulum posuere turpis id condimentum. Sed vitae viverra nisl. Sed ac mauris sed nisl dictum vehicula. Nam sit amet purus ac dui ultrices efficitur. Pellentesque porta augue et nulla bibendum, sed faucibus ante vestibulum. Vivamus sem augue, aliquet eget tellus ut, auctor fermentum ex. Sed sit amet lectus ut mi rhoncus eleifend a eget neque. Morbi ac diam vel dui posuere cursus. Nullam dolor leo, ornare mattis metus vitae, euismod maximus massa.";
		const stepNumber = 2;
		const recipeID = 5;
		const newStep = await addNewStep(stepText, stepNumber, recipeID);
		expect(newStep).toBeUndefined();
	});
});
