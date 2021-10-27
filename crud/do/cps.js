/**
* 处理cps请求后的数据操作
*/
var fs = require('fs')
var studentDBPath = './data/students.json'
var teacherDBPath = './data/teacher.json'
var groupsDBPath = './data/studentsGroups.json'
// 判断登陆者身份
exports.login = function (name, id, callback) {
    let idenID = id.substring(0,1)
    if(idenID == '1'){
        console.log('--------')
        fs.readFile(teacherDBPath,function (err,data) {
            if(err) { return callback(err) }
            let teachers = JSON.parse(data).teachers
            console.log(teachers)
            let tea
            for(let i = 0;i<teachers.length;i++){
                if(teachers[i].id === id) {
                    tea = teachers[i]
                }
            }
            console.log(tea)
            if(tea){return callback(null, tea)}
            else{ return callback('NOT FOUND THE ID') }
        })
    }
   else if(idenID == '2'){
        fs.readFile(studentDBPath,function (err,data) {
            if(err) { return callback(err) }
            let students = JSON.parse(data).students
            console.log(students)
            // var stu = students.find(function (item) {
            //     return item.id == id
            // })
            let stu
            for(let i = 0;i<students.length;i++){
                if(students[i].id === id) {
                    stu = students[i]
                }
            }
            if(stu && stu.name == name){return callback(null, stu)}
            else{ return callback('NOT FOUND THE ID') }
        })
    }
    else{ return callback('NOT FOUND THE ID') }
}
// 根据name找到自己所在的组,返回组id
exports.findMyGroups = function (name,callback) {
    fs.readFile(groupsDBPath,function (err,data) {
        let flags = false
        if(err) {return callback(err)}
        let allGroups = JSON.parse(data).Groups
        console.log(allGroups)
        for (let i=0;i<allGroups.length;i++){
            let GroupsMember = allGroups[i].GroupMember
            for(let j=0;j<GroupsMember.length;j++){
                if(GroupsMember[j] === name){
                    flags=true;
                    return callback(null,allGroups[i].GroupID)}
            }
        }
        if(flags === false){console.log('not found you in any groups')}
    })
}
