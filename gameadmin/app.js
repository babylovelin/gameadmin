var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var WXPayApi = require('wxpay-nodejs');
var app = express();


// wxPay config
var mainConfig = {
  APPID: "wxedf69f9306bc876a", //微信分配的公众账号ID（企业号corpid即为此appId）
  MCHID: "1496378492", //微信支付分配的商户号
  KEY: "9F2j8S28d3w0fk1f0fZa2SAfd9aQcaLh",
  APPSECRET: "9c7e8cf23f5735ba30e16e326baa9af2",
  CERT_FILE: path.resolve(__dirname, 'cert/apiclient_cert.pem'),
  CERT_KEY_FILE: path.resolve(__dirname, 'cert/apiclient_key.pem'),
  CA_FILE: path.resolve(__dirname, 'cert/rootca.pem'),
  TIMEOUT: 3000
};
WXPayApi.initialize(mainConfig);

//统一下单
var data = {
  attach: "test", //附加数据
  body: "test", //商品描述
  nonce_str: "1add1a30ac87aa2db72f57a2375d8fec", //随机字符串
  notify_url: "http://wxpay.weixin.qq.com/pub_v2/pay/notify.v2.php", //通知地址
  out_trade_no: "123456781111111", //商户订单号
  total_fee: 1, //总金额
  trade_type: "JSAPI" //交易类型
};
WXPayApi.unifiedorder(data).then((r) => console.log(r.return_msg), (e) => console.error(e));

//设置跨与访问
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization,\'Origin\',Accept,X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
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

//引入mongoose
var mongoose = require('./config/mongoose.js');
var db = mongoose();
var mongoose = require('mongoose');

//引入mysql
var mysql = require('./config/mysql.js')

//用户操作
var user = require('./routes/user')
app.use('/api/user', user)

app.get('/', function(req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});