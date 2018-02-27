const path = require('path');

const cleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
	mode: 'development',
	
	entry: {
		app: ['./src/app.js']
	},
	
	// mode: 'production',
	//mode: 'development',

	output: {
		filename: '[name].min.js',
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: './dist/'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader'
				},
				exclude: '/node_modules/'
			}
		]
	},

	plugins: [
		new cleanWebpackPlugin(['dist'])
	]
};

module.exports = config;