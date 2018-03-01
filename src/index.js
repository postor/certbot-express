
const fs = require('fs-extra')
const url = require('url')
const Http2 = require('./Http2')


module.exports.http2 = (config) => {
  return new Http2(config)
}

module.exports.redirect = (req, res, next) => {
  if (req.secure) {
    next()
    return
  }
  res.redirect(fullUrl(req))
}

function fullUrl(req) {
  return url.format({
    protocol: 'https',
    host: req.get('host'),
    pathname: req.originalUrl
  });
}


