var fs = require('fs')
var express = require('express')
var router = express.Router()
var Student = require('./do/student')
var genUserSig = require('./do/genUserSig')
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
    var student = req.body
    Student.save(student,function (err) {
        if(err) {
            return res.status(500).send('server error')
        }
         res.redirect('/students')
    })
    // 处理表单，读取文件，转变成对象，导入新纪录，保存
    // 专门制作一个文件负责数据，封装对于这个数据模块的所有操作，只处理数据，不关心业务（交互）

})
router.get('/students/delete', function (req, res) {
    var id = req.query.id
    console.log(id);
    Student.delete(id,function (err) {
        if(err){ return res.status(500).send('server error')}
    })
    res.redirect('/students')
})

router.get('/students/edit',function (req,res) {
    var id = req.query.id
    var student
    Student.getById(id,function (err,stu) {
        if(err){return res.status(500).send('not find the student')}
        student = stu
        res.render('edit.html',{student:student})
    })
})

router.post('/students/edit', function (req, res) {
    var student = req.body
    console.log(student)
    Student.edit(student,function (err) {
        if(err){res.status(500).send('server error')}
        res.redirect('/students')
    })
})

router.get('/students/ajaxtest', function (req, res) {
    console.log(req);
    res.send('yes you get it')
})

router.get('/chat', function (req, res) {
    res.render('chat.html')
})

router.get('/login/usersig', function (req, res) {
    console.log('收到usersig请求');
    let userID = req.query.userID
    //var a = genUserSig.Api(1400561810,'cba0206b6ce6fae496ec494fc222ddb54cba668b8219414d0c80f4f5eba3eb83')
    let a = new genUserSig.Api(1400561810,'cba0206b6ce6fae496ec494fc222ddb54cba668b8219414d0c80f4f5eba3eb83')
    let usersig = a.genUserSig(userID,86400)
    console.log(usersig)
    res.set({
        "Access-Control-Allow-Origin": "http://localhost:8080",
        "Access-Control-Allow-Credentials": true
    });
    res.send(usersig)
})

module.exports = router

