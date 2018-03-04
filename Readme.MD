# Tree Shaking
顾名思义就是摇树，把没有用到的树叶摇掉，起到缩减文件大小的作用。

## Js Shaking

如果使用`babel`的同时，想使用tree shaking,务必在`.babelrc`中对应的`preset`中增加`modules":false`，否则不会使用使用`export`
[https://alexjoverm.github.io/2017/03/06/Tree-shaking-with-Webpack-2-TypeScript-and-Babel/](https://alexjoverm.github.io/2017/03/06/Tree-shaking-with-Webpack-2-TypeScript-and-Babel/)

具体用法很简单，在`webpack.config.js`中的`plugins`中增加`new webpack.optimize.UglifyJsPlugin(),`即可

## CSS Shaking
除了JS文件需要`tree shaking`外，其实`css`也需要的
比如我引入了`bootstrap`样式库，但是其实只用了`btn`一个样式，这时就很有必要去除无用的样式了

这里也需要引入一个第三方插件`purifycss-webpack`，使用它还需要用到`purify-css`

[官方文档](https://github.com/webpack-contrib/purifycss-webpack)

用法很简单，只需要传一个参数`paths`，告诉插件，要检查哪些文件即可。

示例中在`main.css`中定义了`box`和`big-box`两个样式，但是在`index.html`中只使用了一个，这样打包出来的文件，就不会有没有用到的`big-box`了


demo中还引入了`bootstrap`，在页面上使用了`button`的相关样式，最后生成出来的文件大小为5kb左右，如果不使用`purifycss`的话，大概在180kb。



