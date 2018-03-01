# generate certification | 生成证书

make suer your domain is pointed to this server and run `certbot certonly` on this server | 请确保域名已经指向该服务器，然后运行`certbot certonly`

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

**NOTE** keep generated certification path in mind, something like `/etc/letsencrypt/live/${your_domain}` | 记住生成证书的地址，类似 `/etc/letsencrypt/live/${your_domain}`

