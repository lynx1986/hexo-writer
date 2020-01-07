'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {

    async token() {

        const { ctx, config } = this;
        const token = config.rsa.public;

        ctx.body = {
            data: { item: token }
        };
    }

    async cosToken() {

        const { ctx } = this;
        
        const credential = await ctx.helper.fetchCosCredential();

        ctx.body = {
            data: {
                item: credential
            }
        };
    }

    async login() {

        const { ctx, config } = this;
        const { username, password } = ctx.request.body;
        const { rsa, account } = config;

        // 密码解密
        const decryptedPwd = await ctx.helper.decryptRSA(password, rsa.private);
        console.log('密码解密，加密密码=' + password + ' 解密后=' + decryptedPwd);

        // 如果用户名或者密码不符
        if (decryptedPwd != account.password || username != account.username) {
            console.log('密码不符，登陆失败')
            ctx.body = {
                errcode: 401,
                errmsg: 'Unauthorized'
            };
            return;
        } else {

            // 创建TOKEN并返回
            const token = await ctx.helper.createJwt({ username, password: decryptedPwd });
            console.log('创建TOKEN=' + token);
            ctx.body = {
                data: {
                    item: token
                }
            }
        }
    }

    async loginByToken() {

        const { ctx, config } = this;
        const { account } = config;

        // 创建TOKEN并返回
        const token = await ctx.helper.createJwt(account);
        console.log('创建TOKEN=' + token);
        ctx.body = {
            data: {
                item: token
            }
        }
    }
}

module.exports = AuthController;