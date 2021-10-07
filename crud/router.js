var fs = require('fs')
var express = require('express')
var router = express.Router()
var Student = require('./do/student')
router.get('/students', function (req, res) {
    // 调用写好的异步api
    // 这里的res并不再需要配置render
    Student.find(function (err, students) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.render('index.html',{
            students:students
        })
    })
})
router.get('/students/new', function (req, res) {
    res.render('new.html')
})
router.post('/students/new', function (req, res) {
    console.log(req.body)
    // 处理表单，读取文件，转变成对象，导入新纪录，保存
    // 专门制作一个文件负责数据，封装对于这个数据模块的所有操作，只处理数据，不关心业务（交互）

})
router.get('/students/edit', function (req, res) {

})
router.post('/students/edit', function (req, res) {

})

module.exports = router

