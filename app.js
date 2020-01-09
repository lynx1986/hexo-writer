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

    hexo.on('processAfter', function(post) {
      hexo.call('generate', {}).then(function() {
        console.log('BLOG重新生成')
      });
    })

    this.app.hexo = hexo;
  }

}

module.exports = AppBootHook
