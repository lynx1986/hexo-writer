import NodeRSA from 'node-rsa';
import { runInAction, action, observable } from 'mobx';

import BaseStore from './base';
import api from '@/utils/api';

import Constants from '../Constants';

/**
 * 认证数据
 */
class AuthStore extends BaseStore {

    @observable token = '';
    

    async fetchToken(payload) {

        payload = { ...BaseStore.PAYLOAD, ...payload };
        const { callback, domain } = payload;

        // 提交请求
        const URL = Constants.URL + '/auth/token';
        await super.loadItem(URL, callback, domain);
    }

    @action
    async autoLogin(payload) {

        payload = { ...BaseStore.PAYLOAD, ...payload };
        const { params, callback, domain } = payload;

        const store = this[domain];

        runInAction('登陆开始', () => { store.status.updating = true; });

        // 提交登陆
        const URL = Constants.URL + '/auth/loginByToken';
        const rsp = await api.request(URL, 'POST', params);

        // 取得结果
        runInAction('登陆结束', () => {

            if (rsp.code == 200) {
                const { data: { item } } = rsp;
                store.token = item;
                window.localStorage.setItem(Constants.TOKEN, item);
                console.log('登录成功，设定TOKEN=' + item);
            } else {
                store.token = null;
                window.localStorage.removeItem(Constants.TOKEN);
                console.log('登录失败，清除TOKEN');
            }

            store.status.updating = false;
            store.response.update = rsp.code;
        });

        // 执行回调方法
        super.execCallback(callback, rsp.code, rsp.data);
    }

    @action
    async logout(payload) {

        payload = { ...BaseStore.PAYLOAD, ...payload };
        const { callback, domain } = payload;
        const store = this[domain];

        // 清除TOKEN
        runInAction('退出登录', () => {
            window.localStorage.removeItem(Constants.TOKEN);
            store.token = null;
        });

        // 执行回调方法
        const rsp = { code: 200 };
        super.execCallback(callback, rsp.code, rsp.data);
    }

    @action
    async login(payload) {

        payload = { ...BaseStore.PAYLOAD, ...payload };
        const { params, callback, domain } = payload;
        const store = this[domain];

        // 将密码加密
        const publicKey = new NodeRSA(store.item);
        publicKey.setOptions({ encryptionScheme: 'pkcs1' });
        params.password = publicKey.encrypt(params.password, 'base64');
        
        runInAction('登陆开始', () => { store.status.updating = true; });

        // 提交登陆
        const URL = Constants.URL + '/auth/login';
        const rsp = await api.request(URL, 'POST', params);

        // 取得结果
        runInAction('登陆结束', () => {

            if (rsp.code == 200) {
                const { data: { item } } = rsp;
                store.token = item;
                window.localStorage.setItem(Constants.TOKEN, item);
                console.log('登录成功，设定TOKEN=' + item);
            }

            store.status.updating = false;
            store.response.update = rsp.code;
        });

        // 执行回调方法
        super.execCallback(callback, rsp.code, rsp.data);
    }
}

export default new AuthStore();