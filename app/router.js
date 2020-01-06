'use strict';

module.exports = app => {

    const { router, controller } = app;

    router.get('/post', controller.post.index);
    router.post('/post', controller.post.create);
    router.delete('/post/:slug', controller.post.remove);

    router.get('/tag', controller.tag.index);
    router.get('/category', controller.category.index);
}