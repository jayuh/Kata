# NodeJS微信开发三部曲之《射雕英雄传》初出茅庐

## 目标
- 用NodeJS启动一个简易的Web服务器
- 将这个服务器与微信连通

## 本课程需要用到的东西
- NodeJS环境
- https://natapp.cn/
- Webstorm
- Chrome

## 微信开发文档
- 测试号管理：[http://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index](http://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index)
- 微信开发者文档：[https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421135319&token=&lang=zh_CN](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421135319&token=&lang=zh_CN)

## 用NodeJS启动一个简易的Web服务器
```javascript
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead('200', {'Content-Type': 'text/html'});
    res.end('成功');
}).listen(3000);
```

## 验证服务器的有效性
```javascript
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
```

## 扩展:读取本地文件,并输出给前端
```javascript
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
```

