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
		publicPath: ''
	},

	module: {
		rules: [
		{
			test: /\.js$/,
			use: [
				{
					loader: 'babel-loader'
				}
			]
		},
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
					loader: 'postcss-loader',
					options: {
						ident: 'postcss',
						plugins: [
							require('postcss-cssnext')(),
							require('postcss-sprites')()
						]
					}
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
					limit: 1000,
					useRelativePath: true,
					name: '[name].[hash:5].[ext]'
				}
			},
			{
				loader: 'img-loader',
				// options: {
				// 	jpgquant: {
				// 		quality: 40
				// 	}
				// }
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

