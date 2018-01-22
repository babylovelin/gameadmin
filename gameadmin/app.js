var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session')
require('body-parser-xml')(bodyParser);
var app = express();

//设置跨与访问
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization,\'Origin\',Accept,X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('X-Powered-By', ' 3.2.1');
  // res.header('Content-Type', 'application/json;charset=utf-8');
  res.header('Content-Type', 'application/xml;charset=utf-8');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
//session
app.use(session({
  secret: 'session', //与cookieParser中的一致
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.xml({
  limit: '2MB', // Reject payload bigger than 1 MB
  xmlParseOptions: {
    normalize: true, // Trim whitespace inside text nodes
    normalizeTags: true, // Transform tags to lowercase
    explicitArray: false // Only put nodes in array if >1
  }
}))

var mysql = require('./config/mysql');
//引入mongoose
var mongoose = require('./config/mongoose.js');
var db = mongoose();
// var mongoose = require('mongoose');
var db = require("./public/js/db")

//用户操作
var user = require('./routes/user') //router
app.use('/user', user)

/*注册帐号*/
app.post('/newUser', function(req, res, next) {
  var username = req.body.username
  var password = req.body.password
  db.findUser(username)
    .then(ret => {
      console.log(ret);
      if (ret.err == 0) {
        db.newUser(username, password)
          .then((ret) => {
            res.json({
              err: 0,
              msg: 'user create ok'
            })
          })
      }
      if (ret.err == -1) {
        res.json({
          err: -1,
          msg: 'user exist'
        })
      }
    })

});
//登录
app.post('/login', function(req, res, next) {
  var username = req.body.username
  var password = req.body.password
  db.login(username, password)
    .then(ret => {
      console.log(ret);
      if (ret.err == 0) {
        var user = {
          username: ret.username,
        }
        var issuper = {
          super: ret.super
        }
        req.session.user = user;
        req.session.issuper = issuper;
        console.log(req.session)
        res.json({
          err: 0,
          msg: 'login ok',
          super: ret.super,
          username: ret.username
        })
      } else {
        res.json({
          err: -1,
          msg: 'username or password not correct'
        })
      }
    })
})
//退出
app.post('/logout', function(req, res) {
  req.session.user = null
  return res.send({
    err: 0,
    msg: "loged out!"
  })
});

// app.get('/test', function(req, res) {
//   // res.send('<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>');
//   res.send({
//     err: 0,
//     msg: '123'
//   });
// });
//告知微信，已经得知到帐
app.post('/wxpayresult', function(req, res) {
  // console.log(req);
  var username = req.body.xml.attach
  var roomcardnum = 0
  if (req.body.xml.cash_fee == 50000) {
    roomcardnum = 3300
    db.updateUserRoomcardNum(username, roomcardnum)
  } else if (req.body.xml.cash_fee == 100000) {
    roomcardnum = 7000
    db.updateUserRoomcardNum(username, roomcardnum)
  } else if (req.body.xml.cash_fee == 200000) {
    roomcardnum = 15000
    db.updateUserRoomcardNum(username, roomcardnum)
  }
  if (req.body.xml.cash_fee == 1) {
    roomcardnum = 100
    db.updateUserRoomcardNum(username, roomcardnum)
  }
  //在这里添加代理购卡记录
  var cny = req.body.xml.cash_fee / 100
  var roomcard = roomcardnum
  var time = new Date().toLocaleString()
  var proxyname = username
  db.chargeforproxyrecord(proxyname, time, cny, roomcard)




  res.send("<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>")
})


var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});