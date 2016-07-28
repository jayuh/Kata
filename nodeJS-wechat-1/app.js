/**
 * 用NodeJS启动一个简易的Web服务器,并通过微信的验证接口
 */

var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var crypto = require('crypto');

http.createServer(function (req, res) {
    var urlParse = url.parse(req.url),
        urlPathname = urlParse.pathname,
        urlQuery = querystring.parse(urlParse.query);

    // 验证服务器地址的有效性
    if (req.method === 'GET' && urlPathname === '/server' && urlQuery.echostr) {
        var token = '12345678',
            signature = urlQuery.signature,
            timestamp = urlQuery.timestamp,
            nonce = urlQuery.nonce,
            echostr = urlQuery.echostr,
            str = [token, timestamp, nonce].sort().join(''),
            selfSignature = crypto.createHash('sha1').update(str).digest('hex');
        if (selfSignature === signature) {
            res.writeHead('200', {'Content-Type': 'text/plan'});
            res.end(echostr);
            console.log('验证了一次服务器地址有效性,验证结果:成功.');
        } else {
            res.writeHead('200', {'Content-Type': 'text/plan'});
            res.end('fail');
            console.log('验证了一次服务器地址有效性,验证结果:失败.');
        }
    }

    // 输出前端文件
    else {
        var filePath = './www' + urlPathname;
        fs.readFile(filePath, function (err, data) {
            if (err) {
                res.writeHead('404', {'Content-Type': 'text/plan'});
                res.end('404');
            } else {
                res.writeHead('200', {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    }
}).listen(3000);

console.log('服务器已经启动,端口是3000');




