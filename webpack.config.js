const path = require('path');
const glob = require('glob-all');

const webpack = require('webpack');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const purifyCssWebpackPlugin = require('purifycss-webpack');

const config = {

	entry: {
		app: './src/app.js'
	},

	output: {
		filename: '[name].min.js',
		chunkFilename: '[name].bundel.js',
		path: path.resolve(__dirname, 'dist')
	},

	module: {
		rules: [
		{
			test: /\.js$/,
			use: ['babel-loader']
		},
		{
			test: /\.css$/,
			use: extractTextWebpackPlugin.extract({
				fallback: {
					loader: 'style-loader'
				},
				use: [{
					loader: 'css-loader'
				}]
			})
		}
		]
	},

	plugins: [
	new cleanWebpackPlugin('dist/'),

	new extractTextWebpackPlugin('main.min.css'),

	new webpack.optimize.UglifyJsPlugin(),

	new purifyCssWebpackPlugin({
		paths: glob.sync([
				path.join(__dirname, './index.html'),
				path.join(__dirname, './src/*.css')
			])
	})
	]
}


module.exports = config;