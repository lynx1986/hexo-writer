const Hexo = require('hexo');

class AppBootHook {
  constructor (app) {
    this.app = app
  }

  async didLoad() {

    const hexo = new Hexo('/Volumes/Extend/workspace/learning/hexo-blog', {});

    await hexo.init();
    await hexo.watch();

    this.app.hexo = hexo;
  }

}

module.exports = AppBootHook
