# Code Split & Lazy Load
代码分割的目的是为了让用户尽快看到所需要看到的内容，而不是等所有内容都加载完了才能看到页面。
主要用于首屏加载优化
该功能其实并不是通过增加配置来实现的，而是通过修改代码书写方式来实现的

## require.ensure()
```
require.ensure(['./component/componentA'], function (require) {
	let componentA = require('./component/componentA');
	componentA();
}, 'componentA');
```
通过require.ensure()进行动态引用是`commonJs`，因此`webpack 4.0`并不会对它有任何影响

## import()
`webpack 3.11.0`时写法如下：

```
import(/* webpackChunkName:'lodash' */ 'lodash').then((_) => {
	console.log(_.join(['hello', 'world'], ' '));
});

import(/* webpackChunkName:'componentB' */ './component/componentB')
.then(componentB => {
	componentB();
})
```

注意指定了chunkname后如果希望打包后的文件名称为chunkname，则需要在`webpack.config.js`中的output中增加`chunkFilename: '[name].bundle.js',`

另外，在动态import时，则务必需要使用插件`babel-plugin-syntax-dynamic-import`，
在loader中增加以下属性:
```
module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						plugins: ['syntax-dynamic-import']
					}
				},
				exclude: '/node_modules/'
			}
		]
	}
```

`webpack 4.0`时，其他不变，但是在then里面，不论`import`的是`commonJs`还是`ES Module`，由于import的只是namespace,因此需要再`.`出来实例，如果是`export default`,则需要`.default`
```
import(/* webpackChunkName:'lodash' */ 'lodash').then((_) => {
	console.log(_.default.join(['hello', 'world'], ' '));
});

import(/* webpackChunkName:'componentB' */ './component/componentB')
.then((cb) => {
	cb.componentB();
})
```

# 原文
1. [require-include](https://doc.webpack-china.org/api/module-methods/#require-include)