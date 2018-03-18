import axios from 'axios';
import './style/main.less';

axios.get('/api/fcgi-bin/fcg_get_diss_tag_conf.fcg', {
	g_tk: '1694473000',
	loginUin: '70458055',
	inCharset: 'utf8',
	outCharset: 'utf-8',
	notice: '0',
	hostUin: '0',
	format: 'jsonp',
	tpl: 'macv4',
	v8debug: '1',
	jsonpCallback: 'GetTagListCallback',
	platform: 'yqq',
	needNewCode: '0'
})
.then(res => {
	console.log(res);
})


// axios.post('/api/fcgi-bin/fcg_qm_order_diss.fcg?g_tk=1929059950', {
// 	loginUin:'70458055',
// 	hostUin:'0',
// 	format:'fs',
// 	inCharset:'GB2312',
// 	outCharset:'utf8',
// 	notice:'0',
// 	platform:'yqq',
// 	needNewCode:'0',
// 	g_tk:'1929059950',
// 	uin:'70458055',
// 	dissid:'1188856302',
// 	from:'1',
// 	optype:'2',
// 	utf8:'1',
// 	qzreferrer:'https%3A%2F%2Fy.qq.com%2Fn%2Fyqq%2Fplaysquare%2F1188856302.html%23stat%3Dy_new.index.playlist.name'
// })
// .then(res => {
// 	console.log(res);
// })