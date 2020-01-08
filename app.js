const Hexo = require('hexo');

class AppBootHook {
  constructor (app) {
    this.app = app
  }

  async didLoad() {

    const blog = this.app.config.blog;

    const hexo = new Hexo(blog.base, {});

    await hexo.init();
    await hexo.watch();

    this.app.hexo = hexo;
  }

}

module.exports = AppBootHook
