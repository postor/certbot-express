
const fs = require('fs-extra')
const spdy = require('spdy')
const url = require('url')

module.exports.http2 = (config) => {
  const { certDir, app, keyPath, certPath } = config

  config.listen = (ports = {}) => {
    const { http = 80, http2 = 433 } = ports
    return Promise.all([
      //http
      new Promise((resolve, reject) => {
        app.listen(http, (err) => {
          if (err) {
            reject(err)
            return
          }
          resolve()
        })
      }),
      //http2
      Promise.all([
        fs.readFile(keyPath || certDir + '/privkey.pem'),
        fs.readFile(certPath || certDir + '/fullchain.pem')
      ]).then(([key, cert]) => {
        return new Promise((resolve, reject) => {
          spdy.createServer({ key, cert, }, app)
            .listen(http2, (err) => {
              if (err) {
                reject(err)
                return
              }
              resolve()
            })
        })
      }),
    ])
  }
  return config
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


