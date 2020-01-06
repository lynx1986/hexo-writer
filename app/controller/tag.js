'use strict';

const Controller = require('egg').Controller;

class TagController extends Controller {

    async index() {

        const { ctx } = this;

        const tagPage = await ctx.service.tag.index();

        ctx.body = {
            data: { ...tagPage }
        }
    }
}

module.exports = TagController;