// var mon = require('../../config/mongoose')
var mongoose = require('mongoose')
var User = mongoose.model('User')
var Chargeforplayer = mongoose.model('Chargeforplayer')
var Chargeforproxy = mongoose.model('Chargeforproxy')


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
      time: new Date().toLocaleString(),
      super: "0",
      roomcard: "0"
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
            super: re.super,
            username: re.username
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

//********************************************************************8
//********************************用户************************************
//********************************************************************
// 查询用户信息
exports.getUserInfo = (username) => {
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
        return resolve({
          re
        })
      }
    })
  })
}
//更新用户房卡数
exports.updateUserRoomcardNum = (username, roomcardnum) => {
  return new Promise((resolve, reject) => {
    //先通过username查找到用户信息
    User.findOne({
      username: username
    }, function(err, re) {
      if (err) {
        return reject(err)
      }
      if (re == null) {
        return resolve({
          err: -1,
          msg: 'username not found'
        })
      } else {
        var cardnum = re.roomcard
        var roomcard = parseInt(cardnum) + parseInt(roomcardnum)
        console.log(roomcard);
        User.update({
          username: username
        }, {
          $set: {
            roomcard: roomcard
          }
        }, function(error) {
          if (error) {
            resolve({
              err: -2,
              msg: 'room card update err'
            })
          } else {
            resolve({
              err: 0,
              msg: 'room card update ok'
            })
          }
        });
      }
    })
  })
}


//更新用户密码
exports.resetpassword = (username) => {
  return new Promise((resolve, reject) => {
    //先通过username查找到用户信息
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
        User.update({
          username: username
        }, {
          $set: {
            password: "21232f297a57a5a743894a0e4a801fc3"
          }
        }, function(error) {
          if (error) {
            resolve({
              err: -2,
              msg: 'password update err'
            })
          } else {
            resolve({
              err: 0,
              msg: 'password update ok'
            })
          }
        });
      }
    })
  })
}
//用户修改密码
exports.changepassword = (username, oldpass, newpass) => {
  return new Promise((resolve, reject) => {
    //先通过username查找到用户信息
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
      }
      if (re.password != oldpass) {
        return resolve({
          err: -2,
          msg: 'old pass not correct'
        })
      } else {
        User.update({
          username: username
        }, {
          $set: {
            password: newpass
          }
        }, function(error) {
          if (error) {
            resolve({
              err: -3,
              msg: 'password update err'
            })
          } else {
            resolve({
              err: 0,
              msg: 'password update ok'
            })
          }
        });
      }
    })
  })
}


// 记录代理充值数据
//先查找有没有这个用户，有的话，在该用户数组下添加一条，没有则新建一条数据

exports.chargeforproxyrecord = (proxyname, time, cny, roomcard) => {
  return new Promise((resolve, reject) => {
    var chargeforproxy = new Chargeforproxy({
      proxyname: proxyname,
      time: time,
      cny: cny,
      roomcard: roomcard
    })
    chargeforproxy.save((err) => {
      if (err) {
        return reject({
          err: -1,
          msg: 'new proxy charge record err'
        })
      } else {
        return resolve({
          err: 0,
          msg: 'new proxy charge record ok'
        })
      }
    })
  })
}
//记录代理给用户进行的充值


exports.chargeforplayerrecord = (proxyname, userid, time, roomcard) => {
  return new Promise((resolve, reject) => {
    var chargeforplayer = new Chargeforplayer({
      proxyname: proxyname,
      userid: userid,
      time: time,
      roomcard: roomcard
    })
    chargeforplayer.save((err) => {
      if (err) {
        return reject({
          err: -1,
          msg: 'new proxy charge record err'
        })
      } else {
        return resolve({
          err: 0,
          msg: 'new proxy charge record ok'
        })
      }
    })
  })
}

//查询player充值表
exports.searchinplayerrecord = (proxyname, num) => {
  return new Promise((resolve, reject) => {
    Chargeforplayer.find({
      proxyname: proxyname
    }).sort('-time').limit(num).exec((err, doc) => {
      if (err) return reject(err)
      return resolve(doc)
    })
  })
}

//查询代理给自己的充值记录
exports.getallproxychargeforselfbyname = (proxyname, num) => {
  return new Promise((resolve, reject) => {
    Chargeforproxy.find({
      proxyname: proxyname
    }).sort('-time').limit(num).exec((err, doc) => {
      if (err) return reject(err)
      return resolve(doc)
    })
  })
}

//console.log("searchinplayerrecord")
//this.searchinplayerrecord(20).then(console.log).catch(console.log)


//*****************************************SUPER admin  超级管理员


//查询所有代理
exports.getallproxy = () => {
  return new Promise((resolve, reject) => {
    User.find().sort('-time').exec((err, doc) => {
      if (err) return reject(err)
      return resolve(doc)
    })
  })
}

//删除代理
exports.deleteproxy = (username) => {
  return new Promise((resolve, reject) => {
    User.remove({
      username: username
    }, (err, result) => {
      if (err) return reject(err)
      return resolve(result)
    })
  })
}

//查询代理给自己充值所有充值记录
exports.getallproxychargeforself = () => {
  return new Promise((resolve, reject) => {
    Chargeforproxy.find().sort('-time').exec((err, doc) => {
      if (err) return reject(err)
      return resolve(doc)
    })
  })
}


//查询所有代理给玩家的充值记录

exports.getallproxychargeforplayer = () => {
  return new Promise((resolve, reject) => {
    Chargeforplayer.find().sort('-time').exec((err, doc) => {
      if (err) return reject(err)
      return resolve(doc)
    })
  })
}


//