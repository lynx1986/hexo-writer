'use strict';

const Controller = require('egg').Controller;

class PostController extends Controller {

    async index() {

        const { ctx } = this;

        const items = await ctx.service.post.index();

        ctx.body = {
            errcode: 0,
            errmsg: '',
            data: {
                items,
                total: items.length
            }
        }
    }

    async create() {

        const { ctx } = this;
        const post = ctx.request.body;

        await ctx.service.post.create(post);

        ctx.body = {
            errcode: 0,
            errmsg: '',
        }
    }
}

module.exports = PostController;