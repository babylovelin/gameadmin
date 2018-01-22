var mongoose = require('mongoose');

var chargeforproxySchema = new mongoose.Schema({
  proxyname: String,
  time: String,
  cny: String,
  roomcard: String
});

/*
一个mongoose的模型，叫 User
*/
mongoose.model('Chargeforproxy', chargeforproxySchema);