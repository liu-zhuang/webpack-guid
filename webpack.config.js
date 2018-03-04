const path = require('path');


const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');

const config = {
	mode: 'production',

	entry: {
		app: './src/app.js'
	},

	output: {
		filename: '[name].[hash:8].js',
		chunkFilename: '[name].[bundle].js',
		path: path.resolve(__dirname, 'dist')
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				use: [{
					loader: 'babel-loader'
				}]
			}
		]
	},

	plugins: [
		new CleanWebpackPlugin('dist/'),

		// new UglifyJsWebpackPlugin()
	],

	optimization: {
		minimize: true,
		minimizer: [
			new UglifyJsWebpackPlugin({
				uglifyOptions: {
					output: {
						comments: false
					},
					compress: {
						dead_code: true
					}
				}
			})
		]
	}
};

module.exports = config;