import BaseStore from './base';

import Constants from '../Constants';

/**
 * 分类数据
 */
class CategoryStore extends BaseStore {

    /**
     * 刷新列表
     */
    async refresh(payload) {

        payload = { ...BaseStore.PAYLOAD, ...payload };
        const { callback, domain } = payload;

        // 提交刷新
        const URL = Constants.URL + '/category';
        await super.refresh(URL, callback, domain);
    }
}

export default new CategoryStore();