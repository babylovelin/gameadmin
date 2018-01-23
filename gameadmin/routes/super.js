var express = require('express');
var router = express.Router();
var db = require("../public/js/db")
// var http = require('https');
// var axios = require('axios');
var mysql = require("../config/mysql")
// var xml2js = require('xml2js')
router.use(function(req, res, next) {
  console.log(req.session.user);
  console.log(req.session.issuper);
  if (req.session.user && req.session.issuper.super == 1) {
    next();
  } else {
    return res.send({
      err: -999,
      msg: "not auth!or not super"
    });
  }
})


//查询所有代理
router.post('/getallproxy', function(req, res) {
  console.log(req.session);
  db.getallproxy()
    .then(ret => {
      // console.log(ret);
      res.send(ret)
    })
})
//删除代理
router.post('/deleteproxy', function(req, res) {
  var username = req.body.username
  db.deleteproxy(username)
    .then(ret => {
      // console.log(ret);
      res.send(ret)

    })
})

//查询所有玩家
router.post('/getallplayer', function(req, res) {
  mysql.getallplayer().
  then(ret => {
    res.send(ret)
  })
})

//查询所有代理给自己的充值记录
router.post('/getallproxychargeforself', function(req, res) {
  db.getallproxychargeforself().
  then(ret => {
    res.send(ret)
  })
})

//查询所有代理给玩家的充值记录
router.post('/getallproxychargeforplayer', function(req, res) {
  db.getallproxychargeforplayer().
  then(ret => {
    res.send(ret)
  })
})

module.exports = router;