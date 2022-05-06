const uuid = require('uuid');
const crypto = require('crypto');

function setCookie(cookiename, req, res) {
  // check if client sent cookie
  var cookie = req.cookies[cookiename];
  if (cookie) return;

  cookie = crypto.createHash('sha1').update(uuid.v4()).digest('hex');
  res.cookie(cookiename, cookiename[0] + cookie.toUpperCase(), { maxAge: 900000, httpOnly: true, domain: req.hostname });
}

module.exports = function (req, res, next) {
  setCookie('APP', req, res);
  next();
}
