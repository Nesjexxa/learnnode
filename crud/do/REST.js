var axios =require('axios');
const baseURL = 'https://console.tim.qq.com/v4/openim/querystate?usersig=eJwtzL0OgjAYheF76YqBr5QCJXERR5lAXVgaafHzB2shSDDeu4iM5znJ*ybFLnd7ZUlCfBfIat5YqaZDjTOPZ9nUL4XL11ZXaQxWJKEBAA9pTOH-qMGgVZNzzn2ARTu8-yxkQSQiIehSwXpKF622BZzYg5We1rfS40OW1nIUl7TfOtGA2RM3eekd7f7gxGvy*QKYETOR&identifier=zhangwei&sdkappid=1400561810&contenttype=json';
const secondURL = 'https://console.tim.qq.com/v4/group_open_http_svc/create_group?usersig=eJwtzL0OgjAYheF76YqBr5QCJXERR5lAXVgaafHzB2shSDDeu4iM5znJ*ybFLnd7ZUlCfBfIat5YqaZDjTOPZ9nUL4XL11ZXaQxWJKEBAA9pTOH-qMGgVZNzzn2ARTu8-yxkQSQiIehSwXpKF622BZzYg5We1rfS40OW1nIUl7TfOtGA2RM3eekd7f7gxGvy*QKYETOR&identifier=zhangwei&sdkappid=1400561810&contenttype=json'
// 查询在线状态
exports.QueryOnlineStatue = function (accountList, isDetail, callback) {
    axios
        .post(baseURL,{
            "To_Account": accountList,
            "IsNeedDetail": isDetail?1:0
        })
        .then(result => {
            return callback(null,result.data)
        })
        .catch((e) => {
            return callback(e)
        });
}
// 封装群组功能
exports.CreatGroup = function (memberlist,GroupName,callback) {
    console.log(memberlist)
    console.log(GroupName)
    axios
        .post(secondURL,{
            "Name": GroupName,
            "Type": "Private",
            "MemberList": memberlist
        })
        .then(result => {
            console.log(result.data)
            console.log('------------')
            return callback(null,result.data)
        })
        .catch((e) => {
            return callback(e)
        });
}
