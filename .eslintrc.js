module.exports = {
	parser: 'babel-eslint',
	// @todo remove this extension and set all rules inline
	extends: ['airbnb-base'],
	rules: {
		'import/prefer-default-export': ['off'],
		'import/no-extraneous-dependencies': ['off'],
		indent: ['error', 'tab'],
		'prefer-const': ['off'],
		'no-unused-vars': ['warn'],
		'no-tabs': ['off'],
		'prefer-object-spread': ['off'],
		camelcase: ['off'],
		'no-plusplus': ['off'],
		'prefer-arrow-callback': ['off'],
		'comma-dangle': [
			'error',
			{
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'always-multiline',
				exports: 'always-multiline',
				functions: 'never',
			},
		],
		'prefer-destructuring': [
			'warn',
			{
				VariableDeclarator: {
					array: false,
					object: true,
				},
				AssignmentExpression: {
					array: false,
					object: false,
				},
			},
			{
				enforceForRenamedProperties: false,
			},
		],
		'no-restricted-syntax': [
			'error',
			{
				selector: 'LabeledStatement',
				message:
					'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
			},
			{
				selector: 'WithStatement',
				message:
					'`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
			},
		],
	},
	env: {
		browser: true,
		node: true,
	},
};
