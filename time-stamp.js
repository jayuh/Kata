/**
 * 获取时间戳的各种方法及性能
 */

// 5种获取时间戳的方法
// console.log(Date.now());
// console.log(new Date().getTime());
// console.log(+new Date());
// console.log(process.uptime());
// console.log(process.hrtime());

function getTimeDifference(method, time) {
	var count = time;
	console.time(method);
	while (count) {
		eval(method);
		count--;
	}
	console.timeEnd(method);
}
getTimeDifference('Date.now()', 1000000);
getTimeDifference('new Date().getTime()', 1000000);
getTimeDifference('+ new Date()', 1000000);
getTimeDifference('process.uptime()', 1000000);
getTimeDifference('process.hrtime()', 1000000);