var t = performance.timing;

var pagePerformance = {

	// 页面加载总耗时
	pageloadtime: t.loadEventStart - t.navigationStart;

	// 域名解析耗时
	dns: t.domainLookupEnd - t.domainLookupStart;

	// TCP 连接耗时
	tcp: t.connectEnd - t.connectStart;

	// 读取页面第一个字节之前的耗时
	ttfb: t.responseStart - t.navigationStart;
	
}

console.log(pagePerformance)