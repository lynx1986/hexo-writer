import BaseStore from './base';
import qs from 'qs';

import Constants from '../Constants';

/**
 * 文章数据
 */
class PostStore extends BaseStore {

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