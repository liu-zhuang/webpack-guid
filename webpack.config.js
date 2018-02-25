const path = require('path');
// https://doc.webpack-china.org/guides/output-management/#-dist-
// 清理文件夹的插件
const cleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
	entry: {
		app: ['babel-polyfill', './src/app.js']
	}, 

	output: {
		filename: '[name].[hash:8].js',
		path: path.resolve(__dirname, 'dist')
	},

	module: {
		rules: [
		{
			test: /\.js$/,
			use: {
				loader: 'babel-loader',
			},
			exclude: '/node_modules/'
		}
		]
	},

	plugins: [
		// 参数是个数组，传入目录名称
		new cleanWebpackPlugin(['dist'])
		]
	}

	module.exports = config;