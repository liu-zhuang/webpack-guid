# webpack basic usage
1. 使用`npm init`初始化`package.json`文件
2. 使用`npm install webpack-cli webpack --save-dev`安装`webpack`及其脚手架
   2018.02.26，执行该命令已经是按照`webpack 4.0`了
3. 创建配置webpack的配置文件：`webpack.config.js`
4. 在根目录下创建`src`目录，在该目录下创建`app.js`文件
5. 在`package.json`文件中的`scripts`节点下增加：`"webpack": "webpack"`
   这样做的目的是，在如果不全局安装webpack,那么如果直接在命令行执行`webpack`,会因为没有配置路径而找不到`webpack`的执行文件，需要去`node_modules`下的`webpack`文件夹中找到`bin`下面的`webpack`来执行，而执行`npm run webpack`时，会自动去`node_modules`下找匹配的文件
6. 执行`npm run webpack`
7. 这样`webpack`最基本的用法就实现了
8. 如果直接下载源文件的话，先执行`npm install`来安装依赖
9. `webpack 4.0` 新增了`mode`属性，有`development`和`production`两个值