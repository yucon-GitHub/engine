module.exports = {
	root: false,

	env: {
		node: true,
		browser: true,
		es6: true
	},

	rules: {
		indent: ["error", 2],
		eqeqeq: ["off", "smart"],
		camelcase: [
			"off",
			{
				properties: "never"
			}
		],
		"linebreak-style": ["off"],
		quotes: ["warn", "single"],
		semi: ["error", "always"],
		"no-console": "off",
		"no-debugger": "off",
		"no-tabs": "off",
		"space-before-function-paren": ["error", "never"]
	},

	parserOptions: {
		parser: "babel-eslint"
	},

	extends: ["plugin:vue/essential", "@vue/standard"]
};
