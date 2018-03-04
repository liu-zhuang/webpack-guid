# Tree Shaking
顾名思义就是摇树，把没有用到的树叶摇掉，起到缩减文件大小的作用。

## Js Shaking

如果使用`babel`的同时，想使用tree shaking,务必在`.babelrc`中对应的`preset`中增加`modules":false`，否则不会使用使用`export`
[https://alexjoverm.github.io/2017/03/06/Tree-shaking-with-Webpack-2-TypeScript-and-Babel/](https://alexjoverm.github.io/2017/03/06/Tree-shaking-with-Webpack-2-TypeScript-and-Babel/)

## Cs Shaking
