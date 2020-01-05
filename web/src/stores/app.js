import { observable, runInAction, action, toJS } from 'mobx';

class App {

  @observable me = null;
  @observable paths = ['/'];

  actions = {};

  @action
  addPath(path) {
    runInAction('addPath', () => {
      this.paths.push(path);
    })
  }
  
  @action
  removePath(path) {
    runInAction('removePath', () => {
      const index = toJS(this.paths).findIndex(p => {
        console.log(p, path)
        return p == path;
      });
      this.paths.splice(index, 1);
    });
  }

  hasPath(path) {
    return this.paths.indexOf(path) >= 0;
  }

  @action
  login(data, callback) {
    runInAction('login', () => {
      this.me = { id: 1, name: 'Avatar' };
    });
    callback.success && callback.success();
  }

  @action
  async logout(callback) {

    if (this.actions.logout) {
      const confirmed = await this.actions.logout();
      if (!confirmed) {
        return;
      }
    }

    runInAction('logout', () => {
      this.me = null;
    });
    callback.success && callback.success();
  }
}

export default new App();