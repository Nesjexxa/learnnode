var express = require('express')
var app = express()
var fs = require('fs')
app.engine('html',require('express-art-template'))
app.use('/public/',express.static('./public/'))

app.get('/', function (req, res) {
    fs.readFile('./db.json',function (err,data) {
        if( err ) { return res.status(500).send('server error')}
        res.render('index.html',{
            students:JSON.parse(data).students
        })
    })
})

app.listen('3000', function () {
    console.log('成功开启服务器');
})
