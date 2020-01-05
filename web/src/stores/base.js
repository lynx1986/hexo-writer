import { observable, computed, runInAction, action, extendObservable } from 'mobx';
import deepcopy from 'deepcopy';
import api from '@/utils/api';

const STORE = {
  namespace: 'basic',
  item: null,
  itemIds: [],
  status: {
    refreshing: false,
    loading: false,
    updating: false,
    removing: false,
    creating: false,
    validating: false
  },
  response: {
    refresh: '',
    load: '',
    update: '',
    remove: '',
    create: '',
    validate: ''
  },
  page: {
    total: 0,
    current: 0,
    limit: 10
  }
}

class Base {

  @observable itemsById = {};
  @observable basic = STORE;

  items(domain) {
    domain = domain || 'basic';
    const itemIds = this[domain].itemIds;
    return itemIds.map(id => this.itemsById[id]).slice();
  }

  page(domain) {
    domain = domain || 'basic';
    return this[domain].page;
  }

  status(domain) {
    domain = domain || 'basic';
    return this[domain].status;
  }

  @action
  createStore(domain) {
    runInAction('创建新store', () => {
      const store = {};
      store[domain] = deepcopy(STORE);
      extendObservable(this, store);
    });
  }

  @action
   async updatePage(page, domain='basic') {

    // 取得store
    const store = this[domain];
    runInAction('更新分页页数', () => { store.page.current = page.current; });
  }

  @action
  async validate(url, callback, domain='basic') {

    // 取得store
    const store = this[domain];

    runInAction('校验开始', () => { store.status.validating = true; });

    // 请求数据
    const rsp = await api.request(url);

    // 取得结果
    runInAction('校验结束', () => {

      store.status.validating = false;
      store.response.validate = rsp.code;

      // 执行回调方法
      this.execCallback(callback, rsp.code, null);
    })
  }

  @action
  async refresh(url, callback, domain='basic') {

    // 取得store
    const store = this[domain];

    runInAction('列表刷新开始', () => { store.status.refreshing = true; });

    // 请求数据
    const rsp = await api.request(url);

    // 取得结果
    runInAction('列表刷新结束', () => {

      if (rsp.code == 200) {
        
        const { data: { total, items } } = rsp;
        store.itemIds = [];

        items.forEach(item => {
          this.itemsById[item.id] = item;
          store.itemIds.push(item.id);
        });

        store.page.current = 0;
        store.page.total = total || 0;
      }

      store.status.refreshing = false;
      store.response.refresh = rsp.code;

      // 执行回调方法
      this.execCallback(callback, rsp.code, rsp.data);
    });
  }

  @action
  async load(url, callback, domain='basic') {

    // 取得store
    const store = this[domain];

    runInAction('列表加载开始', () => { store.status.loading = true; });

    // 请求数据
    const rsp = await api.request(url);

    // 取得结果
    runInAction('列表加载结束', () => {

      if (rsp.code == 200) {
        
        const { data: { total, items } } = rsp;

        items.forEach(item => {
          this.itemsById[item.id] = item;
          store.itemIds.push(item.id);
        });

        store.page.current++;
        store.page.total = total || 0;
      }

      store.status.loading = false;
      store.response.load = rsp.code;

      // 执行回调方法
      this.execCallback(callback, rsp.code, rsp.data);
    });
  }

  @action
  async create(url, data, callback, domain='basic') {

    // 取得store
    const store = this[domain];

    runInAction('创建开始', () => { store.status.creating = true; });

    // 请求数据
    const rsp = await api.request(url, 'POST', data);

    // 取得结果
    runInAction('创建结束', () => {

      if (rsp.code == 200) {
        const { data: { item } } = rsp;
        store.item = item;
      }

      store.status.creating = false;
      store.response.create = rsp.code;

      // 执行回调方法
      this.execCallback(callback, rsp.code, rsp.data);
    });
  }

  @action
  async update(url, data, callback, domain='basic') {

    // 取得store
    const store = this[domain];

    runInAction('更新开始', () => { store.status.updating = true; });

    // 请求数据
    const rsp = await api.request(url, 'PUT', data);

    // 取得结果
    runInAction('更新结束', () => {

      // 更新状态
      store.status.updating = false;
      store.response.update = rsp.code;

      // 执行回调方法
      this.execCallback(callback, rsp.code, rsp.data);
    });
  }

  @action
  async remove(url, callback, domain='basic') {

    // 取得store
    const store = this[domain];

    runInAction('更新开始', () => { store.status.removing = true; });

    // 请求数据
    const rsp = await api.request(url, 'DELETE');

    // 取得结果
    runInAction('更新结束', () => {

      // 更新状态
      store.status.removing = false;
      store.response.remove = rsp.code;

      // 执行回调方法
      this.execCallback(callback, rsp.code, rsp.data);
    });
  }

  /**
   * 执行回调方法
   * @param {*}} callback 
   * @param {*} code 
   */
  execCallback(callback, code, data) {

    if (code == 200) {
      callback && callback.success && callback.success(data);
    } else {
      callback && callback.fail && callback.fail(code);
    }
    callback && callback.complete && callback.complete();
  }
}

Base.PAYLOAD = { params: {}, callback: {}, domain: 'basic' };

export default Base;