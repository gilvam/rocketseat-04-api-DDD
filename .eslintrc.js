module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: ['standard', 'plugin:prettier/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				printWidth: 80,
				tabWidth: 3,
				useTabs: true,
				singleQuote: true,
				trailingComma: 'all',
				arrowParens: 'always',
			},
		],
		indent: ['error', 'tab'],
		'no-tabs': 'off',
		'no-useless-constructor': 'off',
		'@typescript-eslint/no-useless-constructor': 'error',
	},
	settings: {
		'import/parsers': {
			[require.resolve('@typescript-eslint/parser')]: [
				'.ts',
				'.tsx',
				'.d.ts',
			],
		},
	},
};
