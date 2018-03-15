const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');

const config = {
	mode: 'development',

	entry: {
		app: './src/app.js',
		common: './src/common.js'
	},

	output: {
		filename: '[name].[chunkhash:8].js',
		path: path.resolve(__dirname, 'dist')
	},

	module: {
		rules: [
		{
			test: /\.js$/,
			use: {
				loader: 'babel-loader'
			}
		},
		{
			test: /\.(png|jpeg)$/,
			use: {
				loader: 'file-loader',
				options: {
					outputPath: '/assets/imgs/'
				}
			}
		},
		{
			test: /\.html$/,
			use: {
				loader: 'html-loader'
			}
		}
		]
	},

	plugins: [
	new CleanWebpackPlugin('./dist/'),

	new HtmlWebpackPlugin({
		title: 'Hello HtmlWebpackPlugin',
		filename: 'app.html',
		template: './index.html',
		inject: true,
		// minify: {
		// 	collapseWhitespace: true
		// },
		minify: false,
		hash: false,
		// chunks: ['app', 'common']
	}),

	// new HtmlWebpackInlineChunkPlugin({
	// 	inlineChunks: ['common']
	// })
	]
};

module.exports = config;