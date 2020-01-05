'use strict';

const { Service } = require('egg');

class PostService extends Service {

    index(page, limit) {

        const { hexo } = this.app;

        const posts = hexo.locals.get('posts').data;

        return posts.map(post => {
            delete post.prev;
            delete post.next;
            post.id = post._id;
            return post;
        })
    }
    
    create(post) {

        const { hexo } = this.app;
        hexo.post.create(post);
    }
}

module.exports = PostService;