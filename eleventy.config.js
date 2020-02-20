const glob = require('globby');

module.exports = function (eleventyConfig) {
	const non_compiled_files = glob.sync([
		'./src/*',
		'!./src/scripts/',
		'!./src/styles/',
		'!./src/index.html',
	]);
	for (let to_copy of non_compiled_files) {
		eleventyConfig.addPassthroughCopy(to_copy);
	}

	return {
		dir: {
			input: 'src',
			output: 'dist',
		},
	};
};
