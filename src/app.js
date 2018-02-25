// import 'babel-polyfill';
const a = 'hello webpack!';

function test () {
	let a = 123;
	return new Promise((resolve, reject) => {
		resolve();
	});
}

let func = () => {
	const arr = [1, 2, 3, 4, 5];
	console.log(arr.includes(1));
	console.log('arrow function');
}