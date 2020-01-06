'use strict';

const { Service } = require('egg');

class CategoryService extends Service {

    index() {
        const { hexo } = this.app;

        const categories = hexo.locals.get('categories').data;

        return {
            items: categories.map(tag => tag.name),
            total: categories.length
        }
    }
}

module.exports = CategoryService;