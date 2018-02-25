# Babel
首先安装`babel`相关
```
npm install --save-dev babel-core babel-loader babel-preset-env
```

在`webpack.config.js`中增加`module`属性:
```
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
	}
```

为`babel`增加配置文件`.babelrc`:
```
{
	"presets": [["env", {
		"targets": {
			"chrome": "62"
		}
	}]]
}
```

`babel`的target属性也可以由`browserlist`来配置:[browserslist](https://www.npmjs.com/package/browserslist)

# polyfill
使用`polyfill`有以下方法: 
   在js文件的头部`import 'babel-polyfill'`
   在entry中加入:
   ```
	entry: {
		app: ['babel-polyfill', './src/app.js']
	}
   ```
# transform-runtime
```
npm install --save-dev babel-plugin-transform-runtime
```
修改`.babelrc`文件，在下面增加`plugins`属性:
```
{
	"presets": [["env", {
		"targets": {
			"chrome": "62"
		}
	}]],
	"plugins": ["transform-runtime"]
}
```


# Tips
1. [babel-polyfii](https://babeljs.cn/docs/usage/polyfill/)
2. [transform-runtime](https://babeljs.cn/docs/plugins/transform-runtime)
3. `.browserslistrc`[browserslist](https://www.npmjs.com/package/browserslist)
   Run npx browserslist in project directory to see what browsers was selected by your queries.


