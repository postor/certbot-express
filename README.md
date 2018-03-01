# certbot-express

simple and free http2 with express | 简单免费给express升级http2

## prepare  | 准备

if you are not using certbot, skip this | 如果你不使用certbot，跳过此步骤 

### certbot

[install certbot](./docs/install-certbot.md)

### generate certification | 生成证书

[point your domain to your server | 将域名指向要部署的服务器](./docs/point-domain-to-server.md)

```
certbot certonly

```
[see full conversation here | 查看命令对话详情](./docs/generate-certification-certonly.md)

## install | 安装

```
npm install certbot-express
```

## usage | 使用

```
const express = require('express')
const { redirect, http2 } = require('certbot-express')

const app = express()
const certDir = '/etc/letsencrypt/live/test.i18ntech.com/'

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

```

or  | 或者

```
http2({
  keyPath:'/etc/letsencrypt/live/test.i18ntech.com/privkey.pem',
  certPath:'/etc/letsencrypt/live/test.i18ntech.com/fullchain.pem'
  app,
})
```

## renew certification | 更新证书

it might be something like this, you can add it to your cron job

```
certbot renew --pre-hook "forever stop app.js" --post-hook "forever start app.js"
```

