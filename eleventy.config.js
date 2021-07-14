const glob = require('globby');
const Image = require('@11ty/eleventy-img');

async function imageShortcode(src, alt, classes = '') {
	if (alt === undefined) {
		console.warn(`Missing 'alt' on responsiveimage from: ${src}`);
	}

	if (!src.startsWith('./src/')) {
		src = src.startsWith('/') ? `./src${src}` : `./src/${src}`;
	}

	let metadata = await Image(src, {
		widths: [null],
		formats: ['webp', 'png'],
		urlPath: '/images/',
		outputDir: 'dist/images/',
	});

	let lowsrc = metadata.png[0];
	// let highsrc = metadata.png[metadata.png.length - 1];

	return `<picture>
    ${Object.values(metadata)
		.map((imageFormat) => {
			return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat
				.map((entry) => entry.srcset)
				.join(', ')}">`;
		})
		.join('\n')}
      <img
        src="${lowsrc.url}"
        class="images__preview${classes ? ' ' + classes : ''}"
        alt="${alt.toString().replace('"', '\\"')}"
        loading="lazy"
        decoding="async">
    </picture>`;
}

module.exports = function (eleventyConfig) {
	const non_compiled_files = glob.sync(
		['./src/**', '!./src/scripts/', '!./src/styles/', '!./src/index.html', '!./src/_includes'],
		{ onlyFiles: false, deep: 1 }
	);

	for (let to_copy of non_compiled_files) {
		eleventyConfig.addPassthroughCopy(to_copy);
	}

	/**
	 * Returns a number, which is the current year + the argument, which defaults to 0.
	 */
	eleventyConfig.addShortcode('relativeYear', function (_to) {
		let to = _to;
		if (typeof to !== 'number') {
			to = 0;
		}

		let today = new Date();
		today.setFullYear(today.getFullYear() + to);

		return today.getFullYear();
	});
	eleventyConfig.addShortcode('imagePreview', imageShortcode);

	return {
		dir: {
			input: 'src',
			output: 'dist',
		},
	};
};
