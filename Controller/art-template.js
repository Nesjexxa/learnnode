var template = require('art-template')
var fs = require('fs')
var http = require('http')

var server = http.createServer()
var wwwDir = '/Users/zhangwei/WebstormProjects/learnnode/resource'

server.on('request',function (req, res) {
    var url = req.url
    var filePath = '/'

    if (url != filePath) {
        filePath = url
    }

    fs.readFile(wwwDir+filePath,function (err,data) {
        if (err) {
            return res.end('404 Not Found')
        }
        var ret = template.render(data.toString(),{
            name:'jack',
            age:18,
            home:'北京',
            hobbies:['篮球','羽毛球','乒乓球']
        })
        return res.end(ret)
    })

})

server.listen(3000)
