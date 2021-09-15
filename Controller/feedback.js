var http = require('http')
var fs = require('fs')
var template = require('art-template')
var url = require('url')

var comments =[
    {
        name:'a',
        message:'今天天气不错',
        dateTime:'2015-10-16'
    },
    {
        name:'b',
        message:'今天天气不错',
        dateTime:'2015-10-16'
    },
    {
        name:'c',
        message:'今天天气不错',
        dateTime:'2015-10-16'
    },
    {
        name:'d',
        message:'今天天气不错',
        dateTime:'2015-10-16'
    },
    {
        name:'e',
        message:'今天天气不错',
        dateTime:'2015-10-16'
    },
]
http.createServer(function (req,res) {
    // 使用url.parse 将路径解析为一个方便操作的对象
    // 方便拿到 url中的特定字段
    var parseObj = url.parse(req.url, true)

    // 单独获取不包含字符查询的部分（该路径不包含？之后的内容）
    var pathName = parseObj.pathname

    // var url = req.url
    console.log('接收到访问请求，请求的url为'+ url)
    if (pathName === '/') {
        fs.readFile('../views/index.html',function (err,data) {
            if (err) { return res.end('404 Not Found')}
            var ret = template.render(data.toString(),{comments:comments})
            res.end(ret)
        })
    }else if (pathName === '/pinglun') {
        // 用url模块的parse方法把请求路径中的查询字符串给解析成一个对象了

        var comment = parseObj.query
        //接下来要做的事：1。生成日期到数据对象中，然后存储到数组中
        //2.让用户重定向到首页

        // 添加dateTime 属性字段
        comment.dateTime = '2021 -11-2 17:11:22'
        comments.push(comment)

        // 重定向到首页
        // 1.状态码设置为302
        // 2.在响应头中通过location告诉客户端往哪儿重定向，客户端扫描到302会自动寻找location
        res.statusCode = 302
        res.setHeader('location','/')
        res.end()
    }
    else if(pathName === '/home') {
     fs.readFile('../views/homemodel.html',function (err, data) {
         if (err) {
             return res.end('404 Not Found')
         }
         var ret = template.render(data.toString(), {
             comments:comments
         })
         res.end(ret)
     })
    }
    else if(pathName === '/post') {
        fs.readFile('../views/post.html',function (err, data) {
            if(err) { res.end('404 Not Found')}
            res.end(data)
        })
    }
    else if (pathName.indexOf('/public/') === 0 ) {
        fs.readFile('..'+pathName,function (err,data) {
            if(err) {return res.end('404 Not Found')}
            res.end(data)
        })
    }else{
        fs.readFile('../views/404.html',function (err,data) {
            if (err) {
                return res.end('404 Not found')
            }
            res.end(data)
        })
    }
}).listen(3000,function () {
    console.log('服务启动成功')
})
