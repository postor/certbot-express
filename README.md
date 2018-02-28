# certbot-express

simple and free http2 with express | 简单免费给express升级http2

## prepare  | 准备

if you are not using certbot, skip this | 如果你不使用certbot，跳过此步骤 

### certbot

```
# registry
sudo apt-get -o Acquire::ForceIPv4=true update

#git
sudo apt install git -y

# certbot
sudo apt-get -o Acquire::ForceIPv4=true update
sudo apt-get install software-properties-common -y
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get -o Acquire::ForceIPv4=true update
sudo apt-get install certbot  -y

```

### generate certification | 生成证书

point your domain to your server | 将域名指向要部署的服务器

```
certbot certonly

#How would you like to authenticate with the ACME CA?
#-------------------------------------------------------------------------------
#1: Spin up a temporary webserver (standalone)
#2: Place files in webroot directory (webroot)
#-------------------------------------------------------------------------------
#Select the appropriate number [1-2] then [enter] (press 'c' to cancel): 1

#Enter email address (used for urgent renewal and security notices) (Enter 'c' to
#cancel): postor@gmail.com
#Please read the Terms of Service at
#https://letsencrypt.org/documents/LE-SA-v1.2-November-15-2017.pdf. You must
#agree in order to register with the ACME server at
#https://acme-v01.api.letsencrypt.org/directory
#-------------------------------------------------------------------------------
#(A)gree/(C)ancel: A

#Would you be willing to share your email address with the Electronic Frontier
#Foundation, a founding partner of the Let's Encrypt project and the non-profit
#organization that develops Certbot? We'd like to send you email about EFF and
#our work to encrypt the web, protect its users and defend digital rights.
#-------------------------------------------------------------------------------
#(Y)es/(N)o: Y

#Please enter in your domain name(s) (comma and/or space separated)  (Enter 'c'
#to cancel): test.i18ntech.com

```

**NOTE** keep generated certification path in mind, something like `/etc/letsencrypt/live/test.i18ntech.com/` | 记住生成证书的地址，类似 `/etc/letsencrypt/live/test.i18ntech.com` 

## install

```
npm install certbot-express
```

## usage

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