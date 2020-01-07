const jwtCoder = require('jwt-simple');
const INTEGER_REG = /^\+?[1-9][0-9]*$/;
const UUID_REG = /^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/;

function parseUrl(url) {
  
    // 定义识别出的ID
    let id = '';
  
    // 识别url中的每一个参数
    let chars = url.split('/');
    for (let i = 0; i < chars.length; i++) {
  
        // 如果是整数，识别为id
        if (INTEGER_REG.test(chars[i])) {
            id = parseInt(chars[i]);
            chars[i] = ':id';
            break;
        }
  
        // 如果是uuid，识别为id
        else if (UUID_REG.test(chars[i])) {
            id = chars[i];
            chars[i] = ':id';
            break;
        }
    }
  
    url = chars.join('/');
    url = url.split('?')[0];
  
    return { url, id };
}
  

  
module.exports = () => {

    return async function jwtHandler(ctx, next) {

        const { jwt, account } = ctx.app.config;

        const token = ctx.get(jwt.key);
        const secret = jwt.secret;

        console.log('jwtHandler 取得token和secret', token, secret);

        // 解析URL和URL中的ID（包括UUID格式）
        const { url, method } = ctx.request;
        const parsedUrl = parseUrl(url);
        const paramUrl = method + ' ' + parsedUrl.url;

        // 如果在白名单中，不校验
        if (jwt.whitelist.indexOf(paramUrl) >= 0) {
            await next();
            return;
        }

        try {

            const decoded = jwtCoder.decode(token, secret);
            console.log('解析token成功', decoded);

            if (!decoded || !decoded.exp || decoded.exp <= Date.now()) {
                ctx.body = { errcode: 401 };
                return;
            }

            // 如果与加密的账户不符，校验失败
            if (decoded.password != account.password) {
                ctx.body = { errcode: 401 };
                return;
            }
        }
        catch (err) {
            console.log(err);
            ctx.body = { errcode: 401 };
            return;
        }

        await next();
    }
}