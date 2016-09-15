// 循环次数
var len = i = 10000
// 被抽出来的次数
var total = 0
// 比例(变量): 可保留两位小数
var scale = process.env.SCALE || 10

while (i) {
	var random = Math.random()
	if (Math.floor(random * 10000) < scale * 100) {
		total++
	}
	i--
}


console.log(`设定抽样比例为${scale}%，循环${len}次，抽出结果为${total}次，真是结果约等于${(total/len*100).toFixed(2)}%。`)