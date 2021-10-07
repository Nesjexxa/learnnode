var http = require('http')
var fs = require('fs')
var server = http.createServer()
var template = require('art-template')
server.on('request',function (req,res) {
    var url = req.url
    if(url === '/') {
        fs.readFile('./index.html',function (err,data) {
            if(err) {res.end('文件读取失败')}
            else{
                //
                //res.setHeader('Content-Type','text/plain;charset=utf-8')
                var ret = template.render(data.toString())
                res.end(ret)
            }
        })
    }else if (url === '/home'){
        return(res.end('请求的是home'))
    }
})
server.listen(3001, function () {
    console.log('服务器启动成功，请在3000端口访问')
})
