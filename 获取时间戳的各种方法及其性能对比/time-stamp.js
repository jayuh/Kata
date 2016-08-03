/**
 * 获取时间戳的各种方法及性能
 */

// 5种获取时间戳的方法
// Date.now();
// new Date().getTime();
// +new Date();
// process.uptime();
// process.hrtime();

function getTimeDifference(method, time) {
	var count = time || '100000';
	console.time(method);
	while (count) {
		eval(method);
		count--;
	}
	console.timeEnd(method);
}
getTimeDifference('Date.now()');
getTimeDifference('process.uptime()');
getTimeDifference('new Date().getTime()');
getTimeDifference('+ new Date()');
getTimeDifference('process.hrtime()');
