var express = require('express');
var router = express.Router();

var app = 'Demo App';

router.get('/', function (req, res, next) {
  res.render('./demo/index', { app, title: 'Intro' });
});

router.get('/info.htm', function (req, res, next) {
  res.render('./demo/info', { app, title: 'Info' });
});

router.get('/resume.htm', function (req, res, next) {
  res.render('./demo/resume', { app, title: 'Resume' });
});

router.get('/thankyou.htm', function (req, res, next) {
  res.render('./demo/thankyou', { app, title: 'Thank you' });
});

module.exports = router;
