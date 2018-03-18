const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	mode: 'development',

	entry: {
		app: './src/app.js'
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[hash:8].js',
		chunkFilename: '[name]'
	},

	devtool: 'eval',
	// devtool: 'cheap-module-source-map',
	// devtool: 'source-map',

	devServer: {
		port: 4000,
		overlay: true,
		inline: true,
		compress: true,
		// hot: true,
		// contentBase: 'dist',
		historyApiFallback: {
			rewrites: [
			{
				from: 'pages/b',
				to: './pages/b.html'
			},
			{
				from: 'a',
				to: './a.html'
			}
			]
		},
		// host: '127.0.0.1',
		proxy: {
			'/api': {
				target: 'https://c.y.qq.com/splcloud',
				changeOrigin: true,
				secure: false,
				pathRewrite: {'^/api': '/'},
				logLevel: 'debug'
			}
			// '/api': {
			// 	target: 'https://c.y.qq.com/folder',
			// 	changeOrigin: true,
			// 	secure: false,
			// 	pathRewrite: {'^/api': '/'},
			// 	headers: {
			// 		"Cookie": "pgv_pvi=6530476032; ptui_loginuin=70458055@qq.com; pt2gguin=o0070458055; RK=7bpdimixUT; ptcz=ecffb1d3e4f0a5a0eb9a1a2db96b5582353e774ccde1e8543321c32b9e21b827; tvfe_boss_uuid=9fb4788ff53dad1f; pgv_pvid=3740814100; o_cookie=70458055; pac_uid=1_70458055; pgv_si=s1146240000; ptisp=ctc; uin=o0070458055; pgv_info=ssid=s361255043; ts_uid=3107838999; yq_index=0; player_exist=1; qqmusic_fromtag=66; yplayer_open=0; yqq_stat=0; skey=@sdg87rC3p; luin=o0070458055; lskey=000100006c5c6a0f00539600625e854ac2fa78f9d31a351d875dd6e267bf787b132ea4030e0c9eb77ef87cba; p_uin=o0070458055; pt4_token=s43Z48jMPf467lAma8HyndWiahJY5RSlqu0f5HF7Gp4_; p_skey=i-hawITCK-mD9y6oLnUHB-fX-qwVfI5EtV1PPyrHy4A_; p_luin=o0070458055; p_lskey=0004000084ff7618961c78910c5fab3ec15167d1f4c90d9922a86ce5e9303b75d25b2deea968905598d35df4; ts_last=y.qq.com/n/yqq/playsquare/1188856302.html; ts_refer=xui.ptlogin2.qq.com/cgi-bin/xlogin"
			// 	}
			// }
		}
	},

	module: {
		rules: [
		{
			test: /\.js$/,
			include: [path.resolve(__dirname, 'src'), './a.js'],
			use: [
			{
				loader: 'babel-loader'
			},
			{
				loader: 'eslint-loader',
				options: {
					formatter: require('eslint-friendly-formatter')
				}
			}]
		},
		{
			test: /\.less/,
			use: [
			{
				loader: 'style-loader',
				options: {
					sourceMap: true
				}
			},
			{
				loader: 'css-loader',
				options: {
					sourceMap: true
				}
			},
			{
				loader: 'less-loader',
				options: {
					sourceMap: true
				}
			}
			]
		},
		{
			test: /\.(jpeg|png)$/,
			use: {
				loader: 'file-loader'
			}
		}
		]
	},

	plugins: [
	new CleanWebpackPlugin('./dist/'),

	new HtmlWebpackPlugin({
		template: './index.html'
	})
	]

};

module.exports = config;