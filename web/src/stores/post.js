import qs from 'qs';
import COS from 'cos-js-sdk-v5';
import { runInAction, action, observable } from 'mobx';

import BaseStore from './base';
import api from '@/utils/api';
import Constants from '../Constants';

/**
 * 文章数据
 */
class PostStore extends BaseStore {

    @observable cos = null;

    /**
     * COS初始化
     */
    @action
    async initilizeCos() {

        runInAction('开始初始化', () => {
            this.cos = new COS({
                getAuthorization: async function (options, callback) {
                    
                    const URL = Constants.URL + '/auth/cosToken';
                    const rsp = await api.request(URL, 'GET');
                    console.log('请求COS临时秘钥，应答=', rsp);
                    
                    if (rsp.code == 200) {
    
                        console.log('取得COS秘钥', rsp.data)
                        const { item } = rsp.data;
                        callback({
                            TmpSecretId: item.credentials.tmpSecretId,
                            TmpSecretKey: item.credentials.tmpSecretKey,
                            XCosSecurityToken: item.credentials.sessionToken,
                            StartTime: item.startTime, // 单位是秒
                            ExpiredTime: item.expiredTime
                        })
                    } else {
                        callback(null)
                    }
                }
            });
        });
    }

    /**
     * 上传图片
     */
    async upload(payload) {

        payload = { ...BaseStore.PAYLOAD, ...payload };
        const { params, callback, domain } = payload;
        const store = this[domain];

        runInAction('开始上传', () => { store.status.updating = true; });

        // 提交上传
        this.cos.putObject({
            Bucket: 'a-lightyear-1257102393',
            Region: 'ap-beijing',
            Key: params.file.name,
            StorageClass: 'STANDARD',
            Body: params.file,
            onProgress: function(p) {
                console.log(p);
            }
        }, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        })
    }

    /**
     * 刷新列表
     */
    async refresh(payload) {

        payload = { ...BaseStore.PAYLOAD, ...payload };
        const { params, callback, domain } = payload;
        const store = this[domain];

        const query = {
            current: store.page.current,
            limit: store.page.limit,
            ...params
        };

        // 提交刷新
        const URL = Constants.URL + '/post?' + qs.stringify(query);
        await super.refresh(URL, callback, domain);
    }
    
    /**
     * 提交文章
     */
    async create(payload) {

        payload = { ...BaseStore.PAYLOAD, ...payload };
        const { params, callback, domain } = payload;

        // 提交
        const URL = Constants.URL + '/post';
        await super.create(URL, params, callback, domain);
    }

    /**
     * 删除文章
     */
    async remove(payload) {

        payload = { ...BaseStore.PAYLOAD, ...payload };
        const { params, callback, domain } = payload;

        // 提交
        const URL = Constants.URL + '/post/' + params.slug;
        await super.remove(URL, callback, domain);
    }
}

export default new PostStore();