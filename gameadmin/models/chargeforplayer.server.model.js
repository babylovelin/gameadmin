var mongoose = require('mongoose');

var chargeforplayerSchema = new mongoose.Schema({
  proxyname: String,
  userid: String,
  time: String,
  roomcard: String
});

/*
一个mongoose的模型，叫 User
*/
mongoose.model('Chargeforplayer', chargeforplayerSchema);