var express = require('express')
var fs = require('fs')
// 创建服务器应用程序
var app = express()
// 公开public 目录，此后以/public/开头的资源请求会被自动处理
// 不再需要写 路径匹配
 app.use('/public/',express.static('./public/'))
// express 判断路径，并处理
app.get('/',function (req,res) {
    res.end('hello express!')
})
// 不再需要将中文转码，也不会乱码
// 一个一个判断路径，非常易读
app.get('/home',function (req,res) {
    res.end(' express！ 你好')
})

app.get('/linba',function (req,res) {
    fs.readFile('./public/linba.png',function (err,data) {
        if (err) {
            return res.end('404 Not Found')
        }
        res.end(data)
    })
})
app.listen(3000,function () {
    console.log('app is running')
})
