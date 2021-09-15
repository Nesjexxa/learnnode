var http = require('http')
var fs =require('fs')

var wwwDir = '/Users/zhangwei/WebstormProjects/learnnode/resource'
var server = http.createServer()

server.on('request',function (req, res){
    var url = req.url
    var filePath = '/index.html'
    if(url != filePath) { filePath=url }
    fs.readFile(wwwDir+filePath,function (err,data) {
        if (err) {
            return res.end('404 Not Found')
        }
        res.end(data)
    })
})

// 服务器中听取
server.listen(3000,function (){
    console.log('服务器启动成功')
})
