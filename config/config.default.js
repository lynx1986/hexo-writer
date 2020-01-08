
const rsaInfo = require('./rsa');
const appInfo = require('./app');

const path = require('path');
const resolvePath = (p) => path.resolve(__dirname, p)

module.exports = {

  keys: 'hexo-admin',

  static: {
    prefix: '',
    dir: [resolvePath('../dist'), resolvePath('../web/dist')]
  },

  security: {
    csrf: {
      enable: false
    },
    domainWhiteList: ['http://localhost:3000'] // For Dev
  },

  middleware: [ 'errorHandler', 'jwtHandler'],

  // RSA加密相关
  rsa: rsaInfo,

  view: {
    root: [resolvePath('../web/dist')].join(','),
    defaultViewEngine: 'nunjucks',
  },

  jwt: {
    enable: true,
    secret: '123abc',
    expires: 7,
    key: 'auth-jwt',
    whitelist: [
      'POST /auth/login',
      'GET /auth/token',
      'GET /'
    ]
  },

  account: appInfo.account,

  qcloud: appInfo.qcloud
}
