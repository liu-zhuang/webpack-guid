// import componentA from './component/componentA.js';
// import componentB from './component/componentB.js';
// componentA();
// componentB();
require.include('./util/common.js');
require.ensure(['./component/componentA'], function (require) {
	let componentA = require('./component/componentA');
	componentA();
}, 'componentA');

import(/* webpackChunkName:'lodash' */ 'lodash').then((_) => {
	console.log(_.default.join(['hello', 'world'], ' '));
});

import(/* webpackChunkName:'componentB' */ './component/componentB')
.then((cb) => {
	cb.componentB();
})

console.log('code split');