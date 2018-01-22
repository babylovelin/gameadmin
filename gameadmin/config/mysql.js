var mysql = require('mysql');
var connection = mysql.createConnection({
  host: '116.62.227.93',
  user: 'dealer',
  password: 'dealer',
  database: 'tinymahjong'
});

connection.connect();


// var sql = 'SELECT * FROM t_users';
// //查
// connection.query(sql, function(err, result) {
//   if (err) {
//     console.log('[SELECT ERROR] - ', err.message);
//     return;
//   }
//
//   console.log('--------------------------SELECT----------------------------');
//   console.log(result);
//   console.log('------------------------------------------------------------\n\n');
// });

//通过用户id查询用户信息
exports.checkUser = (userid) => {
  return new Promise((resolve, reject) => {
    var sql = 'SELECT * FROM t_users WHERE userid=' + userid;
    connection.query(sql, function(error, results, fields) {
      // if (error) throw error;
      if (error) {
        return resolve({
          err: -2,
          msg: 'params err'
        })
      }
      if (results == '') {
        return resolve({
          err: -1,
          msg: 'userid not found'
        });
      } else {
        return resolve({
          res: results
        })
      }

    })
  })

}


//给玩家充值房卡
exports.chargeRoomcard = (userid, playerroomcardnum) => {
  return new Promise((resolve, reject) => {
    //先查现在有多少房卡
    var sql = 'SELECT * FROM t_users WHERE userid=' + userid;
    //查
    connection.query(sql, function(err, result) {
      if (err) {
        return resolve({
          err: -2,
          msg: 'select params err'
        })
      } else {
        var modSql = 'UPDATE t_users SET gems = ? WHERE userid = ?';
        var newroomcardnum = parseInt(playerroomcardnum) + parseInt(result[0].gems);
        var modSqlParams = [newroomcardnum, userid];
        connection.query(modSql, modSqlParams, function(err, updateresult) {
          if (err) {
            return resolve({
              err: -3,
              msg: 'update params err'
            })
          } else {
            return resolve({
              err: 0,
              msg: 'update gems ok'
            })
          }

        });
      }
    });
  })
}