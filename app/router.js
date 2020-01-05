'use strict';

module.exports = app => {

    const { router, controller } = app;

    router.get('/post', controller.post.index);

    router.post('/post', controller.post.create);
}