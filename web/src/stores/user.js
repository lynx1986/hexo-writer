import BaseStore from './base';
import qs from 'qs';

/**
 * 用户数据
 */
class UserStore extends BaseStore {

  /**
   * 刷新列表
   * @param {*} payload 
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
    const URL = '/api/user?' + qs.stringify(query);
    await super.refresh(URL, callback, domain);
    await super.updatePage({ current: query.current });
  }

  /**
   * 删除用户
   * @param {*} payload 
   */
  async remove(payload) {

    payload = { ...BaseStore.PAYLOAD, ...payload };
    const { params, callback, domain } = payload;

    // 提交删除
    const URL = '/api/user?id=' + params.id;
    await super.remove(URL, callback, domain);
  }

  /**
   * 创建用户
   * @param {*} payload 
   */
  async create(payload) {

    payload = { ...BaseStore.PAYLOAD, ...payload };
    const { params, callback, domain } = payload;

    // 提交删除
    const URL = '/api/user';
    await super.create(URL, params, callback, domain);
  }

  /**
   * 更新用户
   * @param {*} payload 
   */
  async update(payload) {

    payload = { ...BaseStore.PAYLOAD, ...payload };
    const { params, callback, domain } = payload;

    // 提交删除
    const URL = '/api/user?id=' + params.id;
    await super.update(URL, params, callback, domain);
  }

  /**
   * 校验字段
   * @param {*} payload 
   */
  async validate(payload) {

    payload = { ...BaseStore.PAYLOAD, ...payload };
    const { params, callback, domain } = payload;

    // 提交删除
    const URL = '/api/user/validate?name=' + params.name;
    await super.validate(URL, callback, domain);
  }
}

export default new UserStore();