var express = require('express');
var router = express.Router();
var db = require("../public/js/db")
var http = require('https');
var axios = require('axios');
var mysql = require("../config/mysql")
var xml2js = require('xml2js')
// router.use(function(req, res, next) {
//   if (req.session.user) {
//     next();
//   } else {
//     return res.send({
//       err: -999,
//       msg: "not auth!"
//     });
//   }
// })

//得到用户信息
router.post('/getUserInfo', function(req, res) {
  var username = req.body.username
  db.getUserInfo(username)
    .then(ret => {
      res.send(ret)
    })
})

//代理给自己充值
// router.post('/chargeRoomcardByWx', function(req, res) {
//   var username = req.session.user.username
//   var roomcardnum = req.body.roomcardnum
//   db.updateUserRoomcardNum(username, roomcardnum)
//     .then(ret => {
//       res.send(ret)
//     })
// })


//超级用户重置代理密码
router.post('/resetpassword', function(req, res) {
  var username = req.body.username
  if (req.session.issuper.super == 1) {
    db.resetpassword(username)
      .then(ret => {
        res.send(ret)
      })
  } else {
    res.send({
      err: -3,
      msg: 'not super'
    })
  }
})

//代理修改密码
router.post('/changepassword', function(req, res) {
  var username = req.body.username
  var oldpass = req.body.oldpass
  var newpass = req.body.newpass
  db.changepassword(username, oldpass, newpass)
    .then(ret => {
      res.send(ret)
    })
})

// 查询player记录表
router.post('/searchplayerrecord', function(req, res) {
  var num = req.body.num
  var proxyname = req.session.user.username
  db.searchinplayerrecord(proxyname, num)
    .then(ret => {
      // console.log(ret + "###########");
      res.send(ret)
    })
    .catch(err => {
      throw new Error(err)
    })

})



//*****************************************************微信支付********************************
//得到签名
function raw(args) {
  var keys = Object.keys(args);
  keys = keys.sort()
  var newArgs = {};
  keys.forEach(function(key) {
    // newArgs[key.toLowerCase()] = args[key];
    newArgs[key] = args[key];
  });

  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
};

function paysign(appid1, attach1, body1, mch_id1, nonce_str1, notify_url1, openid1, out_trade_no1, spbill_create_ip1, total_fee1, trade_type1) {
  var ret = {
    appid: appid1,
    attach: attach1,
    body: body1,
    mch_id: mch_id1,
    nonce_str: nonce_str1,
    notify_url: notify_url1,
    openid: openid1,
    out_trade_no: out_trade_no1,
    spbill_create_ip: spbill_create_ip1,
    total_fee: total_fee1,
    trade_type: trade_type1
  };
  var string = raw(ret);
  //var key = "lailaiyangzhoumajiangdailiguanli";
  var key = "Lailaiyangzhoumajiangdaili666666"
  string = string + '&key=' + key; //key为在微信商户平台(pay.weixin.qq.com)-->账户设置-->API安全-->密钥设置
  console.log(string + '--------1111111-------');
  var crypto = require('crypto');
  return crypto.createHash('md5').update(string).digest('hex').toUpperCase();
  // sign=MD5(stringSignTemp).toUpperCase()
};

function paysign2(appId2, timeStamp2, nonceStr2, package2, signType2) {
  var ret = {
    appId: appId2,
    timeStamp: timeStamp2,
    nonceStr: nonceStr2,
    package: package2,
    signType: signType2
  }
  var string = raw(ret);
  var key = "Lailaiyangzhoumajiangdaili666666"
  string = string + '&key=' + key; //key为在微信商户平台(pay.weixin.qq.com)-->账户设置-->API安全-->密钥设置
  console.log(string + '----------2222-----------');
  var crypto = require('crypto');
  return crypto.createHash('md5').update(string).digest('hex').toUpperCase();
}
// function getnoncestr() {
//   return "qweasd" + parseInt(Math.random() * 50000) + "aaabbb"
// }
function getnoncestr() {
  return Math.random().toString(36).substr(2);
}

// ××××××××××××××××××××得到openid×××××××××××××××××××
router.post('/getToken', function(req, res) {
  // var ip = req.connection.remoteAddress;
  var ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '');
  // console.log("!!!!!!!!!!!!!!!!!!!" + ip);
  var code = req.body.code
  var totalfee = req.body.fee
  console.log("@@@@@" + req.body.code + "@@@@@");
  var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxedf69f9306bc876a&secret=9c7e8cf23f5735ba30e16e326baa9af2&code=" + code + "&grant_type=authorization_code"
  axios.get(url)
    .then((resopenid) => {
      var openid1 = resopenid.data.openid
      //开始统一下单
      //参数配置
      var appid1 = "wxedf69f9306bc876a"
      var attach1 = req.session.user.username
      var body1 = "fangka"
      var mch_id1 = "1494079082"
      var nonce_str1 = getnoncestr()
      var notify_url1 = "http://dealer.870yx.com/api/wxpayresult"
      var out_trade_no1 = new Date().getTime()
      var spbill_create_ip1 = ip
      var total_fee1 = totalfee
      var trade_type1 = 'JSAPI'
      var sign1 = paysign(appid1, attach1, body1, mch_id1, nonce_str1, notify_url1, openid1, out_trade_no1, spbill_create_ip1, total_fee1, trade_type1)
      var formData = "<xml>";
      formData += "<appid>" + "<![CDATA[" + appid1 + "]]>" + "</appid>"; //appid
      formData += "<attach>" + "<![CDATA[" + attach1 + "]]>" + "</attach>"; //appid
      formData += "<body>" + "<![CDATA[" + body1 + "]]>" + "</body>"; //商品描述
      formData += "<mch_id>" + "<![CDATA[" + mch_id1 + "]]>" + "</mch_id>"; //商户号
      formData += "<nonce_str>" + "<![CDATA[" + nonce_str1 + "]]>" + "</nonce_str>"; //随机字符串，不长于32位。
      formData += "<notify_url>" + "<![CDATA[" + notify_url1 + "]]>" + "</notify_url>"; //微信结果通知回调地址
      formData += "<openid>" + "<![CDATA[" + openid1 + "]]>" + "</openid>";
      formData += "<out_trade_no>" + "<![CDATA[" + out_trade_no1 + "]]>" + "</out_trade_no>"; //商户订单号
      formData += "<spbill_create_ip>" + "<![CDATA[" + spbill_create_ip1 + "]]>" + "</spbill_create_ip>"; //终端IP
      formData += "<total_fee>" + "<![CDATA[" + total_fee1 + "]]>" + "</total_fee>"; //总额
      formData += "<trade_type>" + "<![CDATA[" + trade_type1 + "]]>" + "</trade_type>"; //回调地址交易类型
      // formData += "<sign>" + "<![CDATA[" + sign1 + "]]>" + "</sign>"; //签名
      formData += "<sign>" + sign1 + "</sign>"; //签名
      formData += "</xml>";
      // formData = JSON.stringify(formData)
      axios.post('https://api.mch.weixin.qq.com/pay/unifiedorder',
        formData
      ).then((resorder) => {
        // console.log(resorder.data + "统一下单");
        xml2js.parseString(resorder.data, {
          explicitArray: false
        }, function(err, json) {
          //再做一次签名，微信内调起H5
          var appId2 = 'wxedf69f9306bc876a'
          // var timeStamp = Date.now()
          var timeStamp2 = (Date.parse(new Date()) / 1000).toString()
          var nonceStr2 = getnoncestr().toUpperCase()
          var package2 = "prepay_id=" + json.xml.prepay_id
          var signType2 = "md5"
          var sign2 = paysign2(appId2, timeStamp2, nonceStr2, package2, signType2)
          // console.log("######" + sign2 + "###########");
          res.send({
            package: package2,
            appId: appId2,
            timeStamp: timeStamp2,
            nonceStr: nonceStr2,
            signType: signType2,
            sign: sign2
          })
        });
      })

    })

});

//接收微信支付成功的结果通知




// ********************************************************************************
// ***********************************mysql操作*******************************************
// ********************************************************************************

//查询玩家信息
router.post('/checkUser', function(req, res) {
  var userid = req.body.userid
  // console.log(userid + "$$$$$$$$$$$$");
  mysql.checkUser(userid).then((ret) => {
    res.send(ret)
  })

})
//充值房卡，更新数据库
//在这个过程中，扣除代理的房卡数，增加玩家的房卡数，当代理房卡数不足时，提示取充值房卡
router.post('/chargeRoomcard', function(req, res) {
  var userid = req.body.userid //玩家id
  var playerroomcardnum = req.body.roomcardnum //给玩家充值的房卡数
  var roomcardnum = 0 - parseInt(req.body.roomcardnum) //给代理减去的房卡数
  var username = req.session.user.username //代理的id
  //先查询该代理是否有足够的卡数来充值
  db.getUserInfo(username)
    .then((r) => {
      // console.log(r.re);
      if (r.re.roomcard < parseInt(playerroomcardnum)) {
        res.send({
          err: -3,
          msg: 'proxy roomcard not enough'
        })
      } else {
        //更新代理的房卡数
        db.updateUserRoomcardNum(username, roomcardnum)
          .then((re) => {
            //更新玩家房卡数
            mysql.chargeRoomcard(userid, playerroomcardnum)
              .then((ret) => {
                //添加充值记录
                var time = new Date().toLocaleString()
                var proxyname = username
                db.chargeforplayerrecord(proxyname, userid, time, playerroomcardnum)
                res.send(ret)
              })
          })
      }

    })


})

module.exports = router;