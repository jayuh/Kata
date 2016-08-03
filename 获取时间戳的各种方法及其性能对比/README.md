# NodeJS中获取时间戳的方法及其性能对比

### 一共有5中方法（执行效率依次降低）

```javascript
Date.now();
new Date().getTime();
+new Date();
process.uptime();
process.hrtime();
```

### 解释

Date.now()、new Date().getTime() 和 +new Date() 是浏览器环境下一直都有的，自然不必多说。

process.uptime() 返回的是Node程序已运行的时间，单位秒。

process.hrtime() 返回的是当前的高分辨率时间，格式为[秒, 纳秒]。它是相对于在过去的任意时间，该值与日期无关。优点是：可以获得一个非常精准的时间差，不会受到时钟飘逸的影响；缺点是：速度慢。

### 结论
要获取一个非常精确地时间间隔，用 process.hrtime()；大量循环获取时间戳的时候，要考虑性能，用 Date.now()。


### 监测性能的代码

```javascript
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
```