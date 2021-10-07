var express = require('express')

var app = express()

app.get('/',function (req,res) {

})
app.use('/public/',express.static('./public/'))

app.listen(3002,function(){
    console.log('app is running');
})
