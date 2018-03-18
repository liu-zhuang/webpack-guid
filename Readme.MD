# 9-开发环境

在开发时，经常会遇到起一个`http-server`的场合，`webpack`也提供了这个功能：`dev-server`,之前`vue-cli`还是采用`express`+`middleware`的方式来实现的，现在也改为了直接使用`dev-server`的方式，说明确实现在`dev-server`使用起来很方便了。

# dev-server
[官方文档](https://webpack.js.org/configuration/dev-server/)
使用`dev-server`很简单，在`webpack.config.js`中增加`devServer`属性即可
```
devServer: {
	port: 4000,
	overlay: true,
	inline: true,
	compress: true,
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
	}
},
```

然后在`package.json`中的`script`添加一行命令：`"dev": "webpack-dev-server --open"`，就可以使用`dev-server`来打开开发环境了。


## 常用属性

- port: 端口号
- overlay: 是否在页面上显示打包时的错误信息
- inline: 是否以inline形式，默认为`true`,设为`false`时会在页面上看到`webpack`信息
- compress: 是否压缩
- historyApiFallback: 是否启用h5的historyApiFallback,不启用的话，在`url`中写一个不存在的路径会报错，简单的设为`true`的话，如果没有配置该路径的路由，都会打开默认页面，如果设置为对象，里面配置了`rewrites`属性，则会按照配置的路由打开对应的页面（如上面例子展示)


# proxy
在开发时，如果直接调用服务端的接口，肯定是会报跨域的，所以`dev-server`还提供了`proxy`的功能,例如调用QQ音乐的某个接口：
```
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
```

在调用接口的时候：
```
import axios from 'axios';

axios.get('/api/fcgi-bin/fcg_get_diss_tag_conf.fcg', {
	g_tk: '1694473000',
	loginUin: '70458055',
	inCharset: 'utf8',
	outCharset: 'utf-8',
	notice: '0',
	hostUin: '0',
	format: 'jsonp',
	tpl: 'macv4',
	v8debug: '1',
	jsonpCallback: 'GetTagListCallback',
	platform: 'yqq',
	needNewCode: '0'
})
.then(res => {
	console.log(res);
})
```

`webpack.config.js`中的`proxy`设置了以下属性：
- 代理名称: `/api`，匹配规则
- target: 代理实际指向的url
- changeOrigin: 是否修改origin,一般都是设为true
- secure: 是否加密
- logLevel: 显示log的等级，这个属性不设置的话，并不会打印日志
- pathRewrite: 重写路径，上述例子中，`{'^/api', ''}`,第一个参数为匹配规则，第二个参数是重写后的结果,即以`/api`开头的api,重写为`/`(因为qq音乐的api并没有api)
- headers: 为header设置各个属性，比如在需要cookie时，可以写入`Cookie`


# Hot Module Replacement
模块热更新，在`webpack 3.x`时代，是需要设置`devServer.hot = true`，同时在`plugins`中使用`webpack.hotModuleReplacement`的，但是在`webpack 4.x`中，即使不做任何设置，也会启用`HMR`,反而是如果设置了`hot= true`之后，虽然`webpack`在后台会去重新打包，但是页面并不会`热更新`。


# Source Map

## Js Source Map
在调试时，有时需要看到打包前的代码的位置，这时就要启用`source map`,这时只需要在`webpack.config`中增加`devtool`属性，该属性有很多候选值，具体见[官网](https://webpack.js.org/configuration/devtool/)
为了平衡打包速度和效率，一般在平时开发时选择`eval`,在生产环境选择`cheap-module-source-map`

## CSS Source Map
如果需要给样式文件增加Source Map,则必须给样式文件的每个loader中增加`options.sourceMap = true`
需要注意的是，如果使用了`singleton:true`则source map不会生效

```
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
```



# Eslint
[Eslint中文官方文档](http://eslint.cn/)

启用`Eslint`也很简单，在`js`文件的处理中，最先使用`eslint-loader`即可
```
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
```

`Eslint`的配置统一写在`.eslintrc.js`中
```
module.exports = {
	'env': {
		'browser': true,
		'node': true
	},

	"parserOptions": {
		"ecmaVersion": 6,
		"sourceType": "module"
	},

	'rules': {
		'no-console': ['warn']
	},

	"extends": "eslint:recommended",

	plugins: ['html']

}
```
这里`"extends": "eslint:recommended"`表示使用官方推荐配置


