# HTML In Webpack

## html-webpack-plugin
[link](https://www.npmjs.com/package/html-webpack-plugin)

使用webpack打包资源文件后，由于会使用`hashname`或者`chunkhashname`,因此在html页面引用就很不方便，因此需要使用`html-webpack-plugin`来动态的引用


用法其实很简单，引入这个插件，并在`plugins`中实例化即可，常用的参数如下（或者查阅官方文档）:

- title: 生成的html的title, 使用方式上在模版中加入：`<title><%= htmlWebpackPlugin.options.title%></title>`,但是如果指定了模版文件，就会不work,只有当不指定`template`时才生效，不知道是不是`webpack 4.x`的bug

- filename: 生成的html的名字

- template: 使用的模版

- inject: 是否将打包生成的资源文件注入模版中

- minify: 是否压缩,使用的其实是[html-minifier](https://github.com/kangax/html-minifier#options-quick-reference)，所以参数也应该用这个

- hash: 生成的html是否带hash

- chunks: 嵌入的chunks

- excludeChunks: 排除哪些chunk


## html-loader
如果模版使用的是html文件，同时模版中引用了一些图片，这时就需要用到`html-loader`[link](https://www.npmjs.com/package/html-loader)

但是如果是图片的话，单单使用`html-loader`是不够的，还需要再使用`file-loader`或者`url-loader`来处理图片

为图片指定打包存放路径可以使用`options`中的`outputpath`：
``` javascript
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
}

```


## html-webpack-inline-chunk-plugin
有一些公共的模块其实可以抽取出来，直接在页面上以inline的形式加载，这样就可以减少一次网络请求，这时就可以使用`html-webpack-inline-chunk-plugin`插件，[link](https://www.npmjs.com/package/html-webpack-inline-chunk-plugin)

但是这个插件已经有1年没更新了，因此在目前`webpack 4.x`的环境下报错了


