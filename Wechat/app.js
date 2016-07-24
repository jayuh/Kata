/**
 * 微信后台
 */

var http = require('http');
var https = require('https');
var url = require('url');
var querystring = require('querystring');
var xml2js = require('xml2js');

// 测试账号信息
var wechatConfig = {
    appid : 'wx29564eaf67e22491',
    appsecret : '26d6677307ba0bf5dfa45a0b8a0f958b',
    token : 'Pa888888',
    wechatUrl : 'sz.api.weixin.qq.com',
    access_token : 'sTskAZw0XYGBbISSrENlo_UvOCba69CGj2LtZAe5LhVbjadj8fwRIKXXiv1Wtv4JQ9vJ8aoCx5ARX_UnubWVubgOC5f-dLscEimDlZ8zQMdouaNnaiHlPd2bho5pFdOWBJJfACATBB'
}

// 生产账号信息
// var wechatConfig = {
//     appid : 'wx584b6315fe78a459',
//     appsecret : 'bdc60da97c264f7d6030060de7f4c27e',
//     token : 'Pa888888',
//     wechatUrl : 'sz.api.weixin.qq.com',
//     access_token : 'sTskAZw0XYGBbISSrENlo_UvOCba69CGj2LtZAe5LhVbjadj8fwRIKXXiv1Wtv4JQ9vJ8aoCx5ARX_UnubWVubgOC5f-dLscEimDlZ8zQMdouaNnaiHlPd2bho5pFdOWBJJfACATBB'
// }

http.createServer(function(req, res) {
    var urlParse = url.parse(req.url);
    var urlPathname = urlParse.pathname;
    var urlQuery = querystring.parse(urlParse.query);

    // 自动回复
    var content = '';
    req.on('data', function (chunk) {
        content += chunk;
    });
    req.on('end', function () {
        xml2js.parseString(content, function(err, result) {
            console.log('将xml转换为JS对象');
            console.log(result.xml);
            var obj = {
                ToUserName: result.xml.FromUserName[0],
                FromUserName: result.xml.ToUserName[0],
                CreateTime: +new Date(),
                MsgType: 'text',
                Content: '[自动回复]' + result.xml.Content[0]
            }
            var builder = new xml2js.Builder({
                rootName: 'xml',
                cdata: true
            });
            var xml = builder.buildObject(obj);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(xml);
        });
    });

    // if (urlPathname === '/checkSignature') {
    //     // 验证服务器地址的有效性
    //     // http://28cf2399.ngrok.natapp.cn/checkSignature?signature=f31b8b749778cffabe02e004b0a4d363db389545&timestamp=aaa&nonce=bbb&echostr=abc
    //     var result = '';
    //     var token = wechatConfig.token;
    //     var signature = urlQuery.signature;
    //     var timestamp = urlQuery.timestamp;
    //     var nonce = urlQuery.nonce;
    //     var str = [token, timestamp, nonce].sort().join('');
    //     var selfSignature = crypto.createHash('sha1').update(str).digest('hex');
    //     if (selfSignature === signature) {
    //         result = urlQuery.echostr;
    //     }
    //     res.writeHead(200, {'Content-Type': 'text/plain'});
    //     res.end(result);
    // } else if (urlPathname === '/textMsg') {
    //     var content = '';
    //     req.on('data', function (chunk) {
    //         content += chunk;
    //     });
    //     req.on('end', function () {
    //         console.log(content);
    //     });
    //     res.writeHead(200, {'Content-Type': 'text/plain'});
    //     res.end('success');
    // } else {
    //     res.writeHead(200, {'Content-Type': 'text/plain'});
    //     res.end('404');
    // }
}).listen(3000);

console.log('服务器已启动，地址是：http://127.0.0.1:3000');

// 获取access_token
// https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
function getAAccessToken() {
    var requestUrl = 'https://' + wechatConfig.wechatUrl + '/cgi-bin/token?grant_type=client_credential&appid=' + wechatConfig.appid + '&secret=' + wechatConfig.appid;
    var options = {
        host: wechatConfig.wechatUrl,
        path: '/cgi-bin/token?' + querystring.stringify({
            grant_type: 'client_credential',
            appid: wechatConfig.appid,
            secret: wechatConfig.appsecret
        })
    };
    https.get(options, function(res) {
        var body = '';
        res.on('data', function(d) {
            body += d;
        });
        res.on('end', function() {
            var parsed = JSON.parse(body);
            if (!parsed.errcode) {
                wechatConfig.access_token = parsed.access_token;
                console.log('access_token变更为: ' + wechatConfig.access_token);
                setTimeout(getAAccessToken, (parsed.expires_in || 7200) * 1000 - 200 * 1000);
            } else {
                console.log('获取access_token失败,详情如下: ');
                console.log(parsed);
            }
        });
    }).on('error', function(e) {
        console.error(e);
    });
}
// getAAccessToken();













