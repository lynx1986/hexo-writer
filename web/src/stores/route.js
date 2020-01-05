import { observable, runInAction, action, toJS } from 'mobx';

class Route {

  @observable paths = ['/'];
  history= null;

  init(history) {
    this.history = history;
    this.history.listen(route => this.handleRouteChange(route));
  }

  /** Route切换时的回调 */
  handleRouteChange = route => {
    console.log(route)
    console.log(this.history)

    const { action, location: { pathname } } = this.history;

    switch (action) {
      case 'POP':
        this.removePath(pathname); break;
      case 'PUSH':
      case 'REPLACE':
          this.addPath(pathname); break;
    }
  }

  @action
  removePath(path) {
    console.log('Route removePath path=' + path)
    runInAction('removePath', () => {
      const index = toJS(this.paths).findIndex(p => p == path);
      this.paths.splice(index, 1);
    });
  }

  @action
  addPath(path) {
    console.log('Route addPath path=' + path)
    runInAction('addPath', () => {
      const index = toJS(this.paths).findIndex(p => p == path);
      if (index < 0) {
        this.paths.push(path);
      }
    });
  }
}

export default new Route();