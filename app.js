const Hexo = require('hexo');

class AppBootHook {
  constructor (app) {
    this.app = app
  }

  async didLoad() {

    const hexo = new Hexo('D:/Programming/workspace/hexo/blog', {});

    await hexo.init();
    await hexo.load();
    await hexo.watch();

    this.app.hexo = hexo;
  }

}

module.exports = AppBootHook
