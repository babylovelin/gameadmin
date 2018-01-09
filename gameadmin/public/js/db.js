var mongoose = require('mongoose')
var User = mongoose.model('User')


//************************************************************************************
//**************************************注册*************************************
//*******************************************************************************************
/**
 * 创建新的用户
 */
exports.newUser = (username, password) => {
  return new Promise((resolve, reject) => {
    var user = new User({
      username: username,
      password: password,
      super: 0
    })
    user.save((err) => {
      if (err) {
        return reject({
          err: -1,
          msg: 'new user err'
        })
      } else {
        return resolve({
          err: 0,
          msg: 'new user ok'
        })
      }
    })
  })
}
/*
查询当前用户是否已经注册过
 */
exports.findUser = (username) => {
  return new Promise((resolve, reject) => {
    User.findOne({
      username: username
    }, function(err, re) {
      if (err) {
        return reject(err)
      }
      console.log(re);
      if (re == null) {
        return resolve({
          err: 0,
          msg: 'user not exist'
        })
      } else {
        return resolve({
          err: -1,
          msg: 'user exist'
        })
      }
    })
  })
}

//××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××
//×××××××××××××××××××××××××××××××××××登录××××××××××××××××××××××××××××××××××××××××
//×××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××

//到数据库查询用户名密码是否一致
exports.login = (username, password) => {
  return new Promise((resolve, reject) => {
    User.findOne({
      username: username
    }, function(err, re) {
      if (err) {
        return reject(err)
      }
      if (re == null) {
        return resolve({
          err: -1,
          msg: 'username not fount'
        })
      } else {
        if (re.password == password) {
          return resolve({
            err: 0,
            msg: 'userinfo correct',
            super: re.super
          })
        } else {
          return resolve({
            err: -2,
            msg: 'user password err'
          })
        }


      }
    })
  })
}