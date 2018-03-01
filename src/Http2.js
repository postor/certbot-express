const spdy = require('spdy')
const fs = require('fs-extra')

class Http2 {
  constructor(config) {
    this.config = config
  }

  /**
   * listen
   * @param {Object} ports 
   * @param {number=80} ports.http 
   * @param {number=433} ports.http2 
   * @returns {Promise}
   */
  listen(ports = {}) {
    const { certDir, app, keyPath, certPath, dev } = this.config
    const { http = 80, http2 = 443 } = ports

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
      dev ? Promise.resolve() : Promise.all([
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
}

module.exports = Http2