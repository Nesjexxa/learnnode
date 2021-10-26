var fs = require('fs')
var express = require('express')
var router = express.Router()
var Student = require('./do/student')
var genUserSig = require('./do/genUserSig')
var axios = require('axios')
var Cps = require('./do/cps')
var Rest =require('./do/REST')
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

// 对axios请求http的尝试
// post的请求体需要采用json格式 即 { "name":"value" }
// post请求也能在url中添加query
router.get('/forward',function (req,res) {
    Rest.QueryOnlineStatue(["aaa","bbb"],true,function (err,data) {
        if(err){res.status(500).send('server error')}
        console.log(data)
        res.send(data)
    })
})

// 处理创建聊天群组 需要以JSON格式传输群对象和群内成员名，返回创建的群组ID，并会保存在服务器数据库中
// 如 "memberlist":[{"Member_Account":"aaa"},{"Member_Account":"bbb"}]
router.get('/forward/createGroup',function (req,res) {
    // let memberlist = req.body.memberlist
    let memberlist = [{"Member_Account":"aaa"},{"Member_Account":"bbb"}]
    Rest.CreatGroup(memberlist,'test1',function (err,data) {
        if(err){res.status(500).send('server error')}
        console.log(data)
        res.send(data)
    })
})

// 处理登陆页的身份判断
router.get('/TIM/login', function (req, res) {
    // console.log(req);
    // var person = req.body
    var person =req.query
    console.log(person)
    Cps.login(person.name,person.id,function (err,ident) {
        if (err) {
            return res.status(500).send('server error')
        }
        console.log('-----------')
        res.set({
            "Access-Control-Allow-Origin": "http://localhost:8080",
            "Access-Control-Allow-Credentials": true
        });
        return res.send(ident)
    })
})

router.post('/TIM/login', function (req, res) {
    // console.log(req);
    var person = req.body
    // var person =req.query
    console.log(person)
    Cps.login(person.name,person.id,function (err,ident) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.set({
            "Access-Control-Allow-Origin": "http://localhost:8080",
            "Access-Control-Allow-Credentials": true
        });
        console.log('-----------')
        return res.send(ident)
    })
})
// 寻找自己所在的聊天组 需要传递query 为成员name
// 返回所在聊天组id
router.get('/groupfinished',function (req,res) {
    let myID = req.query.name
    console.log('------------')
    console.log(myID)
    Cps.findMyGroups(myID,function (err,data) {
        if(err){res.status(500).send('server error')}
        res.set({
            "Access-Control-Allow-Origin": "http://localhost:8080",
            "Access-Control-Allow-Credentials": true
        });
        res.send(data)
    })
})
module.exports = router

