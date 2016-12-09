'use strict';

var http = require('http');

//  request :: Object -> Promise String String
module.exports = function(options) {
  return new Promise(function(resolve, reject) {
    var req = http.request(options, function(response) {
      response.setEncoding('utf8');
      if (response.statusCode >= 200 && response.statusCode < 300) {
        var body = '';
        response.on('data', function(s) { body += s; });
        response.on('end', function() { resolve(body); });
      } else {
        reject(http.STATUS_CODES[response.statusCode]);
      }
    });
    req.on('error', function(err) { reject(err.message); });
    req.end();
  });
};
