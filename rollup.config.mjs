import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

const config = {
	input: 'src/scripts/main.js',
	output: {
		file: 'dist/js/main.bundle.js',
		format: 'umd',
		sourcemap: true,
	},
	plugins: [
		resolve({
			customResolveOptions: {
				moduleDirectories: ['node_modules'],
			},
		}),
		commonjs(),
		babel({
			babelHelpers: 'bundled',
			exclude: 'node_modules/**',
		}),
		terser(),
	],
};

const configurations = [];

configurations.push(config);

export default configurations;
