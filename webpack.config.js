const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const config = {
	// mode: 'development',
	mode: 'production',

	entry: {
		app: './src/app.js'
	},

	output: {
		filename: '[name].min.js',
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: 'dist/'
	},

	module: {
		rules: [
		{
			test: /\.less$/,
			use: ExtractTextWebpackPlugin.extract({
				fallback: {
					loader: 'style-loader'
				},
				use: [
				{
					loader: 'css-loader'
				},
				{
					loader: 'less-loader'
				}
				]
			})
		},
		{
			test: /\.(jpg|jpeg|png|gif)$/,
			use: [
			// {
			// 	loader: 'file-loader'
			// }
			{
				loader: 'url-loader',
				options: {
					limit: 100000,
					useRelativePath: true,
					name: '[name].[hash:5].[ext]'
				}
			}
			]
		}
		]
	},

	plugins: [
	new CleanWebpackPlugin('dist/'),

	new ExtractTextWebpackPlugin('main.min.css')
	]
};

module.exports = config;

