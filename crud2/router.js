var express = require('express')
var router = express.Router()

router.get('/path',function (req,res) {
    res.send('yes it is')
})

module.exports=router
