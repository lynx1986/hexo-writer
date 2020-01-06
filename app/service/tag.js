'use strict';

const { Service } = require('egg');

class TagService extends Service {

    index() {
        const { hexo } = this.app;

        const tags = hexo.locals.get('tags').data;

        return {
            items: tags.map(tag => ({
                id: tag._id,
                name: tag.name
            })),
            total: tags.length
        }
    }
}

module.exports = TagService;