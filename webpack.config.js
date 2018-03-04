const path = require('path');

const webpack = require('webpack');
const cleanWebpackPlugin = require('clean-webpack-plugin');


const config = {
	entry: {
		app: './src/app.js'
	},

	output: {
		filename: '[name].[hash:8].js',
		chunkFilename: '[name].bundel.js',
		path: path.resolve(__dirname, 'dist')
	},

	module: {
		rules: [
		{
			test: /\.js$/,
			use: ['babel-loader']
		}
		]
	},

	plugins: [
	new cleanWebpackPlugin('dist/'),

	new webpack.optimize.UglifyJsPlugin()
	]
	}


module.exports = config;