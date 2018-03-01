# 前言
由于`extract-text-webpack-plugin`在`webpack@4.0`下并不能正常工作，因此这里用回`webpack@3.11.0`

# CSS
可以在js里像引用`js`文件一样，在js文件里面引用`css`文件
``` javascript
import  './style/common.css';
import './style/main.css';
```

## 基本用法
处理`.css`和`.js`文件类似，先后使用`css-loader`和`style-loader`即可。

``` javascript
{
	test: /\.css$/,
	use: [
	{
		loader: 'style-loader'
	},
	{
		loader: 'css-loader'
	}
	]
}
```
## 可选参数
- url
- useable

### url
`style-loader`后面可以加上`/url`，这样会把css文件以link的形式引，要注意的是，这时就不能以`css-loader`来解析`.css`文件里，而是需要用`.file-loader`
```
{
	test: /\.css$/,
	use: [
	{
		loader: 'style-loader/url'
	},
	{
		loader: 'file-loader'
	}
	]
}
```
但是采用`url`参数有个缺点，就是如果有引入多个样式文件，则会产生多个`link`文件，并不会合并为同一个文件。

### useable
`useable`参数可以动态控制样式文件是否生效。
在`.js`文件中引入样式文件时，声明为变量。
``` javascript
import common from  './style/common.css';
import main from './style/main.css';

common.use(); // 使用该样式
main.unuse(); // 禁用该样式
```
如果使用了`useable`参数，如果不显示地使用`use()`则样式并不会生效。

## options
- insertAt： 插入位置  有`top`和`bottom`两个
- insertInto: 具体插入哪里  `insertInto: '#box'` 可以指定id
- singleton: 是否单例  如果设为`true`的话，如果有多个样式文件引入，会合入一个`style`标签
- transform: 指定一个函数，在页面加载前调用

这里在项目根目录下创建`css.transform.js`文件
```
module.exports = function (css) {
	console.log(css);
	return css;
}
```
webpack.config.js文件
```
{
	test: /\.css$/,
	use: [
	{
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
	{
		loader: 'css-loader'
	}
	// {
	// 	loader: 'file-loader'
	// }
	]
}
]
```
注意如果用`url`或者`useable`参数，`transform`并不会生效

## postcss
安装相应module
``` 
npm install --save-dev postcss postcss-loader autoprefixer cssnano postcss-cssnext
```

## 参考文档
[style-loader](https://doc.webpack-china.org/loaders/style-loader)
[css-loader](https://doc.webpack-china.org/loaders/css-loader)
