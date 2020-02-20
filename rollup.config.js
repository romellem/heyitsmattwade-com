import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
// import serve from 'rollup-plugin-serve';
// import livereload from 'rollup-plugin-livereload';

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
				moduleDirectory: 'node_modules',
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

// const serve_config = {
// 	...config,
// };
// serve_config.plugins = [
// 	...serve_config.plugins,
// 	serve({
// 		open: true,
// 		contentBase: ['dist'],
// 		host: 'localhost',
// 		port: '3030',
// 	}),
// 	livereload({
// 		watch: 'dist',
// 		verbose: false,
// 	}),
// ];

const configurations = [];

configurations.push(config);

export default configurations;
