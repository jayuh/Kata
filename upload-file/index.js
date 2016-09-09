var express = require('express')
var fs = require('fs')
var multer = require('multer')

var app = express()

app.use(express.static('upload'));
app.use(express.static('static'));
app.use(multer({ dest: '/temp/'}).array('file'))

// 设置模板引擎
app.set('views', './views')
app.set('view engine', 'jade')

// 首页
app.get('/', function(req, res) {
	res.render('index')
})

// 列表页
app.get('/list', function(req, res) {
	fs.readdir( __dirname + '/upload/', function(err, files) {
		if (err) throw err
		res.render('list', {
			list: files
		})
	})
})

// 处理删除请求
app.get('/delete/*', function(req, res) {
	var path = req.path
	var fileName = path.replace('/delete/', '')
	var filePath = __dirname + '/upload/' + fileName
	fs.exists(filePath, function(exists) {
		if (exists) {
			// 该文件存在
			fs.unlink(filePath, function(err) {
				if (err) throw err
				console.log('删除 ' + fileName + ' 成功')
				res.send('删除 ' + fileName + ' 成功，返回 <a href="/list">列表页</a>')
			})
		} else {
			// 该文件不存在
			res.send('该文件不存在，返回 <a href="/list">列表页</a>')
		}
	})
})

// 处理上传请求
app.post('/upload', function(req, res) {
	var theFile = req.files[0]
	console.log('上传文件：' + theFile.originalname + '，大小：' + (theFile.size/1024/1024).toFixed(2) + 'MB')
	fs.readFile(theFile.path, function(err, data) {
		if (err) throw err
		var path = __dirname + '/upload/' + theFile.originalname
		fs.writeFile(path, data, function(err, data) {
			if (err) throw err
			res.render('uploadSuccess')
		})
	})
	
})

var server = app.listen(3333, function() {
	var port = server.address().port
	console.log('应用已启动，端口为：' + port)
})
