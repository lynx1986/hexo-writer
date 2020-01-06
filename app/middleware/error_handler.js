

/**
 * 全局错误处理
 * @param {*} options 
 */
module.exports = () => {

  return async function errorHandler(ctx, next) {

    try {
        await next();

        ctx.body = {
            ...ctx.body,
            errcode: 0,
            errmsg: ''
        };
    }
    catch (err) {
      
      ctx.helper.log('error', LOGGER, MODULE, METHOD, '服务异常', err);

      // 返回错误码（默认：500）
      ctx.body = {
        errcode: 500,
        errmsg: '服务异常'
      }
    }
  }
}
