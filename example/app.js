const express = require('express')
const { redirect, http2 } = require('../src')

const app = express()
const certDir = '/etc/letsencrypt/live/test.i18ntech.com'

app.use(redirect)
app.use('/', (req, res) => {
  res.send('http2!')
})

http2({
  certDir,
  app,
}).listen().then(() => {
  console.log('server started')
}).catch((e) => {
  console.log(e)
})