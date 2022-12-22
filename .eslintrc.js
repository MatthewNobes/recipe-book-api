module.exports = {
	parser: "@typescript-eslint/parser",
	extends: [
		"plugin:@typescript-eslint/recommended",
		"prettier",
		"plugin:prettier/recommended",
	],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
	},
	env: {
		es6: true,
		node: true,
	},
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double", "avoid-escape"],
		semi: ["error", "always"],
		"no-extra-semi": "error",
		"no-multiple-empty-lines": [
			"error",
			{
				max: 2,
				maxEOF: 0,
			},
		],
		"comma-dangle": ["error", "always-multiline"],
		"quote-props": ["error", "consistent-as-needed"],
		"space-before-function-paren": [
			"error",
			{
				anonymous: "always",
				named: "never",
				asyncArrow: "always",
			},
		],
		"lines-between-class-members": [
			"error",
			"always",
			{
				exceptAfterSingleLine: true,
			},
		],
		"no-var": ["error"],
		"require-await": ["error"],
		"no-unused-vars": ["error", { vars: "all", args: "after-used" }],
		camelcase: 1,
		"no-restricted-syntax": [
			"error",
			{
				selector: "SequenceExpression",
				message: "sequence expressions (using comma operator) are not allowed",
			},
			{
				selector: "IfStatement[alternate=null] > EmptyStatement.consequent",
				message: "unexpected empty statement",
			},
			{
				selector: "IfStatement > EmptyStatement.alternate",
				message: "unexpected empty statement",
			},
			{
				selector: "ForInStatement",
				message: "for…in statements are not allowed",
			},
		],
		"generator-star-spacing": ["error", "after"],
	},
};
