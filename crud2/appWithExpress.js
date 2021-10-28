var express = require('express')

var app = express()
var router = require('./router')
app.get('/',function (req,res) {

})
app.use('/public/',express.static('./public/'))
app.use(router)

app.listen(3002,function(){
    console.log('app is running');
})

app.engine('html',require('express-art-template'))
