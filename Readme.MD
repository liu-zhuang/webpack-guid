# File Compress
- 图片，base64
- sprite pic
- font file
- third part js lib

## 图片
- 使用`file-loader`处理图片
- 使用`url-loader`
有以下参数：
```
{
	loader: 'url-loader',
	options: {
		limit: 1000, // 小于什么尺寸被压缩为base64
		useRelativePath: true, // 输出时使用相对路径
		name: '[name].[hash:5].[ext]' // chunkname
	}
}
```

还可以在`url-loader`之前使用`img-loader`来压缩


## 字体
字体文件的用法和图片的用法一摸一样


## 第三方JS库
- 直接在html中引入。
这个在尝试失败了

- 使用`Webpack.ProvidePlugin`插件
```
new Webpack.ProvidePlugin({
		_: 'lodash'
	})
```
上面的方法是针对`node_modules`引入


如果第三方`javascript lib`是在本地引入的，则需要使用`resolve alias`实现:
```
resolve: {
	alias: {
		util: path.resolve(__dirname, 'lib/util.js')
	}
}

```
先声明一个别名。然后就可以在`providePlugin`中使用了
```
new Webpack.ProvidePlugin({
	_: 'lodash',
	u: 'util'
})
```


## 说明
- 当`extract-text-webpack-plugin`用在`webpack 4.x`上的时候，当前的最新版本会有问题，需要安装`@next`的版本
[issue](https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/701)

- 当打包时提示该错误时，`Module build failed: Error: "extract-text-webpack-plugin" loader is used without the corresponding plugin, refer to https://github.com/webpack/extract-text-webpack-plugin for the usage example`，有可能是在`plugins`中没有实例化该插件。



