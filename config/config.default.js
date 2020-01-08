
const path = require('path');


const resolvePath = (p) => path.resolve(__dirname, p)

const PRIVATE_KEY = '';

const PUBLIC_KEY =  '';


module.exports = {

  keys: 'hexo-admin',

  static: {
    prefix: '',
    dir: [resolvePath('../dist'), resolvePath('../app/public')]
  },

  security: {
    csrf: {
      enable: false
    },
    domainWhiteList: ['http://localhost:3000'] // For Dev
  },

  middleware: [ 'errorHandler', 'jwtHandler'],

  rsa: {
    public: PUBLIC_KEY,
    private: PRIVATE_KEY
  },

  jwt: {
    enable: true,
    secret: '123abc',
    expires: 7,
    key: 'auth-jwt',
    whitelist: [
      'POST /admin/auth/login',
      'GET /admin/auth/token',
    ]
  },

  account: {
    username: 'admin',
    password: '123abc'
  },

  qcloud: {
    scope: [{
        action: '',
        bucket: '',
        region: 'ap-beijing',
        prefix: '*'
    }],
    secretId: '',
    secretKey: ''
  }
}
