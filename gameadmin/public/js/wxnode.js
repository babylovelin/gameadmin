exports.jsapipay = function(req, res) {
  var bookingNo = req.query.bookingNo;
  var appid = _appid;
  var attach = _attach;
  var mch_id = _mch_id;
  var nonce_str = _nonce_str;
  var total_fee = _total_fee;
  var notify_url = _notify_url;
  var openid = _openid;
  var body = _body;
  var timeStamp = _timeStamp;
  var url = "https://api.mch.weixin.qq.com/pay/unifiedorder";
  var formData = "<xml>";
  formData += "<appid>" + appid + "</appid>"; //appid
  formData += "<attach>" + attach + "</attach>"; //附加数据
  formData += "<body>" + body + "</body>";
  formData += "<mch_id>" + mch_id + "</mch_id>"; //商户号
  formData += "<nonce_str>" + nonce_str + "</nonce_str>"; //随机字符串，不长于32位。
  formData += "<notify_url>" + notify_url + "</notify_url>";
  formData += "<openid>" + openid + "</openid>";
  formData += "<out_trade_no>" + bookingNo + "</out_trade_no>";
  formData += "<spbill_create_ip></spbill_create_ip>";
  formData += "<total_fee>" + total_fee + "</total_fee>";
  formData += "<trade_type>JSAPI</trade_type>";
  formData += "<sign>" + paysignjsapi(appid, attach, body, mch_id, nonce_str, notify_url, openid, bookingNo, '', total_fee, 'JSAPI') + "</sign>";
  formData += "</xml>";
  request({
    url: url,
    method: 'POST',
    body: formData
  }, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      console.log(body);
      var prepay_id = getXMLNodeValue('prepay_id', body.toString("utf-8"));
      var tmp = prepay_id.split('[');
      var tmp1 = tmp[2].split(']');
      //签名
      var _paySignjs = paysignjs(appid, nonce_str, 'prepay_id=' + tmp1[0], 'MD5', timeStamp);
      res.render('jsapipay', {
        prepay_id: tmp1[0],
        _paySignjs: _paySignjs
      });
      //res.render('jsapipay',{rows:body});
      //res.redirect(tmp3[0]);
    }
  });
}

//签名加密算法
function paysignjsapi(appid, attach, body, mch_id, nonce_str, notify_url, openid, out_trade_no, spbill_create_ip, total_fee, trade_type) {
  var ret = {
    appid: appid,
    attach: attach,
    body: body,
    mch_id: mch_id,
    nonce_str: nonce_str,
    notify_url: notify_url,
    openid: openid,
    out_trade_no: out_trade_no,
    spbill_create_ip: spbill_create_ip,
    total_fee: total_fee,
    trade_type: trade_type
  };
  var string = raw(ret);
  var key = _key;
  string = string + '&key=' + key;
  var crypto = require('crypto');
  return crypto.createHash('md5').update(string, 'utf8').digest('hex');
};
//签名算法注意大小写
function paysignjs(appid, nonceStr, package, signType, timeStamp) {
  var ret = {
    appId: appid,
    nonceStr: nonceStr,
    package: package,
    signType: signType,
    timeStamp: timeStamp
  };
  var string = raw1(ret);
  var key = _key;
  string = string + '&key=' + key;
  console.log(string);
  var crypto = require('crypto');
  return crypto.createHash('md5').update(string, 'utf8').digest('hex');
};
//签名时参数不要转化为小写的
function raw1(args) {
  var keys = Object.keys(args);
  keys = keys.sort()
  var newArgs = {};
  keys.forEach(function(key) {
    newArgs[key] = args[key];
  });
  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
};
//解析xml
function getXMLNodeValue(node_name, xml) {
  var tmp = xml.split("<" + node_name + ">");
  var _tmp = tmp[1].split("</" + node_name + ">");
  return _tmp[0];
}

//