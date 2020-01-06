const resolvePath = (path) => require('path').resolve(__dirname, path)

const PRIVATE_KEY = '-----BEGIN RSA PRIVATE KEY-----\n' +
                    'MIIBOwIBAAJBAK/2xZKgVoNMWBXc/o/1PmG9hl/c0A+fTMVF+5icz5TvU97YBIdt\n' +
                    'YCD2PRjkQ+5hoBcKtIbLiqSUBrfyu5fDHK8CAwEAAQJAUVlKecD6ffTbfDAQ18jP\n' +
                    'MCyIZOUWo0JIIaN671D/fqBpQUDYgrioJ7GiARJgOpYT8igloTYsH/WGoj7DQTy1\n' +
                    '4QIhAOaN3pFxSvOFQVURwNniNFkPj1XCin2lGiwG2/AE2oWJAiEAw2J/ZDgbrJnd\n' +
                    '0iel/0oouiinSr84TYQ4FEBCxSb+OncCIQCT3KLEZoNqQKkQ1Oz5D/EAuVD08Gp/\n' +
                    'gFaTq+Z8PbCj+QIhAJSGXKa3jDoB4UCvCR3uptUUsE8+2zL57pNeYiNyx9FzAiAk\n' +
                    'Hv9NRPfZ+z9eFQ6VZJ0eZK3OpfVi3gZ/Dp2hlEdDQA==' +
                    '-----END RSA PRIVATE KEY-----';

const PUBLIC_KEY =  '-----BEGIN PUBLIC KEY-----\n' +
                    'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAK/2xZKgVoNMWBXc/o/1PmG9hl/c0A+f\n' +
                    'TMVF+5icz5TvU97YBIdtYCD2PRjkQ+5hoBcKtIbLiqSUBrfyu5fDHK8CAwEAAQ==\n' +
                    '-----END PUBLIC KEY-----';


module.exports = {

  keys: 'hexo-admin',

  static: {
    prefix: '/',
    dir: [resolvePath('../dist'), resolvePath('../app/public')]
  },

  security: {
    csrf: {
      enable: false
    },
    domainWhiteList: ['http://localhost:3000']
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
      'POST /auth/login',
      'GET /auth/token'
    ]
  },

  account: {
    username: 'admin',
    password: '123abc'
  }
}
