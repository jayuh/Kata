/**
 * 微信后台
 */

var http = require('http');
var https = require('https');
var url = require('url');
var querystring = require('querystring');
var crypto  = require('crypto');

var wechatConfig = {
    appid : 'wx29564eaf67e22491',
    appsecret : '26d6677307ba0bf5dfa45a0b8a0f958b',
    token : 'Pa888888',
    wechatUrl : 'sz.api.weixin.qq.com',
    access_token : ''
}

http.createServer(function(res, req) {
    var urlParse = url.parse(res.url);
    var urlPathname = urlParse.pathname;
    var urlQuery = querystring.parse(urlParse.query);

    if (urlPathname === '/checkSignature') {
        // 验证服务器地址的有效性
        // http://28cf2399.ngrok.natapp.cn/checkSignature?signature=f31b8b749778cffabe02e004b0a4d363db389545&timestamp=aaa&nonce=bbb&echostr=abc
        var result = '';
        var token = wechatConfig.token;
        var signature = urlQuery.signature;
        var timestamp = urlQuery.timestamp;
        var nonce = urlQuery.nonce;
        var str = [token, timestamp, nonce].sort().join('');
        var selfSignature = crypto.createHash('sha1').update(str).digest('hex');
        if (selfSignature === signature) {
            result = urlQuery.echostr;
        }
        req.writeHead(200, {'Content-Type': 'text/plain'});
        req.end(result);
    } else {
        req.writeHead(200, {'Content-Type': 'text/plain'});
        req.end('404');
    }
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
getAAccessToken();













