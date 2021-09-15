var express = require('express')
var fs = require('fs')
var template = require('art-template')
var comments =  require('../public/js/comments')
var app = express()
var bodyParser = require('body-parser')
// 配置使用art-template 模板引擎
// 第一个参数 表示当渲染以 .art 结尾的文件的时候，使用art-template模板引擎 ------>将作为模板的文件后缀名改为.art 以便辨识 当然这块是自定义的
// express-art-template 是专门用来在express中把art-template整合到express中
// 虽然外部不用加载 art-template 但是需要提前安装它
// 原因是express-art-template 依赖了  art-template
// express 为 res 对象提供了一个方法： render
// render方法默认是不可用的，但是配置了模板引擎就可以使用了
// res.render('html模板名' ，{模板数据}) ---> 替代了原生的 template.render()`
// 第一个参数不能写路径，默认会去项目中的View目录寻找该模板文件
// 也就是说Express 有一个约定，程序员把所有的视图文件都放在了view文件夹
app.engine('html',require('express-art-template'))


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/public/',express.static('../public'))
app.get('/',function (req,res) {
    res.render('index.html',{comments:comments})
})

app.get('/post',function (req,res) {
    res.render('post.html')
})

// 对/linglun 开头，携带query语句的url express应该怎么处理？
app.post('/pinglun',function(req,res){
    console.log(req.body);
    res.redirect('/')
})

app.get('/pinglun',function(req,res){
    console.log(req.query);
    res.redirect('/')
})

app.listen(3000,function () {
    console.log('服务器启动成功，可在3000端口访问')
})
