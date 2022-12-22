module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	testPathIgnorePatterns: ["./build"],
	clearMocks: true,
	setupFilesAfterEnv: ["<rootDir>/singleton.ts"],
};
