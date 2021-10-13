var express = require('express')
var app = express()

var router = require('./router')
var bodyParser = require('body-parser')

// 在这里配置的属性，是全局通用的
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(router)

app.engine('html',require('express-art-template'))

app.use('/public/',express.static('./public/'))
app.use('/node_modules/',express.static('./node_modules/'))


app.listen('3000', function () {
    console.log('成功开启服务器');
})


module.exports = app
