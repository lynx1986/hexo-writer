'use strict';

const Controller = require('egg').Controller;

class PostController extends Controller {

    async index() {

        const { ctx } = this;
        const { current, limit } = ctx.query;

        const postPage = await ctx.service.post.index(current, limit);

        ctx.body = {
            data: { ...postPage }
        }
    }

    async create() {

        const { ctx } = this;
        const post = ctx.request.body;

        await ctx.service.post.create(post);
    }

    async remove() {

        const { ctx } = this;
        const slug = ctx.params.slug;

        await ctx.service.post.remove(slug);
    }
}

module.exports = PostController;