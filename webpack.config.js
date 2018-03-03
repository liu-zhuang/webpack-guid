const path = require('path');

const cleanWebpackPlugin = require('clean-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

const config = {
	// mode: 'development',
	// mode: 'production',

	entry: {
		app: ['./src/app.js']
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].min.js',
		publicPath: './dist/'
	},

	module: {
		rules: [
		{
			test: /\.js$/,
			use: {
				loader: 'babel-loader'
			},
			exclude: '/node_module/'
		},
		{
			test: /\.css$/,
			use: extractTextPlugin.extract({
				fallback: {
				// loader: 'style-loader/url' 
				// 使用url会有个缺点，就是如果有多个文件，那么打包后就会引入多个文件，而并不会合并
				// loader: 'style-loader/useable',
				loader: 'style-loader',
				options: {
					// insertAt: 'top',
					insertInto: '#box',
					singleton: true,
					transform: './css.transform.js' // 不能用url或者useable模式 否则均无效果
				}
			},
			use: [
			{
				loader: 'css-loader',
				options: {
					minimize: true // 使用cssnano 来压缩代码
				}
			},
			{
				loader: 'postcss-loader',
				options: {
					ident: 'postcss',
					plugins: [
					// require('autoprefixer')(),
					require('postcss-cssnext')() // postcss-cssnext 包含了autoprefixer 用了这个就不必在用autoprefixer了
					]
				}
			}]
		})
		},
		{
			test: /\.less$/,
			use: extractTextPlugin.extract({
				fallback: {
					loader: 'style-loader'
				},
				use: [
				{
					loader: 'css-loader'
				},
				{
					loader: 'less-loader'
				}]
			})
		}]
	},

	plugins: [
	new cleanWebpackPlugin('dist'),
	new extractTextPlugin({
		filename: '[name].min.css'
	})
	]
}

module.exports = config;