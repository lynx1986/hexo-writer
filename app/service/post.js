'use strict';

const fs = require('fs');
const { Service } = require('egg');
const dayjs = require('dayjs');

class PostService extends Service {

    index(page, limit) {

        const { hexo } = this.app;

        // 取得所有文章，并根据最新修改时间进行排序
        const posts = hexo.locals.get('posts').data;
        posts.sort((a, b) => dayjs(a.updated).valueOf() < dayjs(b.updated).valueOf());

        const items =  posts.map(post => {
            delete post.prev;
            delete post.next;
            post.id = post._id;
            return post;
        })

        return {
            items,
            total: posts.length
        }
    }
    
    create(post) {

        const { hexo } = this.app;

        // 如果已经有ID，替换
        if (post.hasOwnProperty('_id')) {
            delete post['_id'];
            hexo.post.create(post, true);
        } 
        // 新建
        else {
            console.log('提交文章，无ID，进行添加');
            hexo.post.create(post);
        }
    }

    remove(slug) {

        const { hexo } = this.app;
        const path = hexo.source.base + '_posts/' + slug + '.md';

        // 删除文件
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
        }
    }
}

module.exports = PostService;