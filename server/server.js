/**
 * HTTP Header Security
 *
 * enforce HTTP Strict Transport Security (HSTS) to prevent ManInTheMiddle-attacks
 * on supported browsers (all but IE)
 * > http://www.html5rocks.com/en/tutorials/security/transport-layer-security
 *
 * @header Strict-Transport-Security: max-age=2592000; includeSubDomains
 */

var connectHandler = WebApp.connectHandlers; // get meteor-core's connect-implementation

Meteor.startup(function () {
  // code to run on server at startup
  var MAIL_STRING;

  if (Meteor.settings.mailUser && Meteor.settings.mailPassword && Meteor.settings.smtpServer) {
    MAIL_STRING = [
      'smtp://',
      Meteor.settings.mailUser,
      ':',
      Meteor.settings.mailPassword,
      '@',
      Meteor.settings.smtpServer
    ].join("");
  } else {
    MAIL_STRING = 'smtp://postmaster%40sandbox9d88054e8f50434caec46561e35e6c72.mailgun.org:4559c93a92082366b3d65757714e8510@smtp.mailgun.org:587';
  }

  process.env.MAIL_URL = MAIL_STRING;


  connectHandler.use(function (req, res, next) {
  // res.setHeader('Strict-Transport-Security', 'max-age=2592000; includeSubDomains'); // 2592000s / 30 days
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Headers', [
    'Accept',
    'Accept-Charset',
    'Accept-Encoding',
    'Accept-Language',
    'Accept-Datetime',
    'Authorization',
    'Cache-Control',
    'Connection',
    'Cookie',
    'Content-Length',
    'Content-MD5',
    'Content-Type',
    'Date',
    'User-Agent',
    'X-Requested-With',
    'Origin'
  ].join(', '));
    return next();
  })
});
