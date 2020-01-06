'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {

    async index() {

        const { ctx } = this;

        const categoryPage = await ctx.service.category.index();

        ctx.body = {
            data: { ...categoryPage }
        }
    }
}

module.exports = CategoryController;