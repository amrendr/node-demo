var express = require('express');
var router = express.Router();
var clientip = require('../service/clientip');
const Device = require('device-detector-js');
const deviceDetector = new Device();

router.get('/', function (req, res, next) {

  res.set('Cache-Control', 'private, must-revalidate, proxy-revalidate');

  var client_ip = clientip.getClientIP(req);
  var user_agent = req.get('user-agent');
  var data = [];
  
  data = [
    { text: 'App Version', value: config.appVersion },
    { text: 'Client IP', value: client_ip },
    { text: 'User Agent', value: user_agent },
    { text: 'Device', value: JSON.stringify(deviceDetector.parse(user_agent), null, 2)}
  ];

  res.render('index', { title: 'Info', data });
});

module.exports = router;
