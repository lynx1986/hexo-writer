'use strict';

const fs = require('fs');
const { Service } = require('egg');
const dayjs = require('dayjs');

class PostService extends Service {

    index(current=0, limit=10) {

        const { hexo } = this.app;

        // 取得所有文章，并根据最新修改时间进行排序
        const posts = hexo.locals.get('posts').data;
        posts.sort((a, b) => dayjs(a.updated).valueOf() < dayjs(b.updated).valueOf());

        const offset = current * limit;

        let items = [];
        if (posts.length < offset + limit) {
            items = posts.slice(offset);
        } else {
            items = posts.slice(offset, offset + limit);
        }

        console.log('offset=' + offset, items.length);

        const valueItems = items.map(post => ({
            title: post.title,
            slug: post.slug,
            layout: post.layout,
            date: post.layout,
            updated: post.updated,
            comments: post.comments,
            tags: post.tags.map(tag => tag.name),
            categories: post.categories.map(c => c.name),
            permalink: post.permalink,
            id: post._id,
            _content: post._content
        }));

        return {
            items: valueItems,
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