let fs = require('fs')
let dataDir = __dirname + '/../data/'

// 列表页
exports.listPage = (req, res, next) => {
    // fs.readdir(dataDir, function(err, files) {
    //     if (err) throw err;
    //     files.forEach((item, index) => {
    //         files[index] = decodeURIComponent(item)
    //     })
    //     res.render('index', {mockList: files})
    // });
    res.render('index')
}

// 获取 mock列表 数据
exports.getMockList = (req, res, next) => {
    fs.readdir(dataDir, function(err, files) {
        if (err) {
            res.json({ code: 1, error: '查询数据异常' })
            throw err
        }
        files.forEach((item, index) => {
            files[index] = decodeURIComponent(item)
        })
        res.json({ code: 0, error: 'success', data: files })
    });
}

// 添加一条 mock 数据
exports.addMock = (req, res, next) => {
    let params = req.body
    let url = params.url
    let content = params.content
    if (!url || !content) {
        res.json({
            code: 1,
            message: '缺少必要入参'
        });
        return
    }
    if (!isJSON(content)) {
        res.json({
            code: 1,
            message: '不是JSON数据'
        });
        return
    }
    fs.writeFile(dataDir + encodeURIComponent(url), content, function(err) {
        if (err) throw err;
        console.log(`文件写入成功: ${url}`)
        res.json({
            code: 0,
            message: 'success'
        });
    });
}

// 请求一条 mock 数据
exports.getMock = (req, res, next) => {
    let fileName = req.query.url
    let filePath = dataDir + encodeURIComponent(fileName)
    fs.exists(filePath, function(exists) {
        if (exists) {
            fs.readFile(filePath, 'utf8', function(err, data) {
                if (err) throw err
                res.json({ code: 0, message: 'success', data: JSON.parse(data) })
            })
        } else {
            res.json({ code: 1, error: '没有该条mock数据' });
        }
    })
}

// api mock 数据
exports.apiMock = (req, res, next) => {
    let fileName = req.url.substr(5)
    let filePath = dataDir + encodeURIComponent(fileName)
    fs.exists(filePath, function(exists) {
        if (exists) {
            fs.readFile(filePath, 'utf8', function(err, data) {
                if (err) throw err
                res.json(JSON.parse(data))
            });
        } else {
            res.json({ code: 1, error: '没有该条mock数据' });
        }
    })
}

// 删除一条 mock 数据
exports.deleteMock = (req, res, next) => {
    let fileName = req.body.url
    let filePath = dataDir + encodeURIComponent(fileName)
    fs.exists(filePath, function(exists) {
        if (exists) {
            fs.unlink(filePath, function(err) {
                if (err) throw err;
                res.json({ code: 0, message: 'success' });
            });
        } else {
            res.json({ code: 1, message: '没有该条mock数据' });
        }
    })
}

// 判断是否为json数据
function isJSON (item) {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }

    return false;
}