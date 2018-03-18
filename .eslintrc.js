module.exports = {
	'env': {
		'browser': true,
		'node': true
	},

	"parserOptions": {
		"ecmaVersion": 6,
		"sourceType": "module"
	},

	'rules': {
		'no-console': ['warn']
	},

	"extends": "eslint:recommended",

	plugins: ['html']

}