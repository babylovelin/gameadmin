var express = require('express');
var router = express.Router();
var db = require("../public/js/db")
/* GET home page. */

/*注册帐号*/
router.post('/newUser', function(req, res, next) {
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
router.post('/login', function(req, res, next) {
  var username = req.body.username
  var password = req.body.password
  db.login(username, password)
    .then(ret => {
      console.log(ret);
      if (ret.err == 0) {
        res.json({
          err: 0,
          msg: 'login ok',
          super: ret.super
        })
      } else {
        res.json({
          err: -1,
          msg: 'username or password not correct'
        })
      }
    })
})
module.exports = router;