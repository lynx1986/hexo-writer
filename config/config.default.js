const resolvePath = (path) => require('path').resolve(__dirname, path)

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
  }
}
