import React from 'react';
import { inject, observer } from 'mobx-react';
import Pace from 'react-pace-progress';

import AppMenu from '@/components/AppMenu';
import PageTabs from '@/components/PageTabs';
import Icon from '@/components/Icon';
import Float from '@/components/Float';
import Transition from '@/components/Transition';

import styles from './BasicLayout.module.scss';
import { Breadcrumb, Dropdown, Button, Form, Switch } from 'element-react';

@inject(stores => ({
  app: stores.app,
  auth: stores.auth,
  route: stores.route
}))
@observer
class BasicLayout extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      loading: true,
      setting: false,
      headerFixed: false
    };
  }

  componentDidMount() {
    
    this.loadTimer = setTimeout(() => this.setState({ loading: false }), 1000);

    // 自动登录
    this.props.auth.autoLogin({
      callback: {
        fail: () => this.props.history.replace('/user/login')
      }
    });
  }

  componentWillUnmount() {
    this.loadTimer = null;
  }

  render() {

    const { routes, route: { history: { location }} } = this.props;
    console.log(routes, location)

    return (
      <div className='layout'>
        { this.state.loading ? <Pace color="#20a0ff" height={1} /> : null }
        { this.renderSetting() }
        <div className={styles.aside}>
          <AppMenu activeKey={location.pathname} menu={routes} onClickItem={this.handleMenuClick} />
        </div>
        <div className={styles.main}>
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              { this.renderBreadcrumb() }
              { this.renderUserInfo() }
            </div>
            {/* { this.renderPageTabs() } */}
          </div>
          <div className={styles.body}>
            {this.props.children}
          </div>
          <div className={styles.footer}>

          </div>
        </div>
      </div>
    )
  }

  renderSetting() {

    const { setting, headerFixed } = this.state;

    return (
      <React.Fragment>
        <Float>
          <span onClick={this.handleSetting}>
            <Icon border borderColor='#999' padding={4} size={30} type='set' />
          </span>
        </Float>
        <Transition 
          className={styles.settingWrapper} 
          started={setting} property='right' from={-200} to={10}>
            <div className={styles.settingContent}>
              <Form labelWidth="80">
                <Form.Item label='固定头部'>
                  <Switch onText="是" offText="否" value={headerFixed} onChange={fixed => this.setState({ headerFixed: fixed })} />
                </Form.Item>
              </Form>
              <Button type='info' onClick={() => this.setState({ setting: false })}>关闭</Button>
            </div>
        </Transition>
      </React.Fragment>
    )
  }

  renderUserInfo() {

    return (
      <div>
        <Dropdown onCommand={this.handleClickAccountItem} menu={(
          <Dropdown.Menu>
            <Dropdown.Item command='/center'>个人中心</Dropdown.Item>
            <Dropdown.Item command='/'>首页</Dropdown.Item>
            <Dropdown.Item divided />
            <Dropdown.Item command='logout'>退出</Dropdown.Item>
          </Dropdown.Menu>
        )}>
          <Icon type='account' size={24} />
        </Dropdown>
        
      </div>
    )
  }

  renderBreadcrumb() {

    console.log(this.props)
    const { routes, location } = this.props;
    const curRoutes = this.getCurRoutes(routes, location.pathname);

    return (
      <Breadcrumb className={styles.breadcrumb} separator='/'>
        { curRoutes.map(route => <Breadcrumb.Item key={route.name}>{route.name}</Breadcrumb.Item>) }
      </Breadcrumb>
    )
  }

  renderPageTabs() {

    const { routes, route: { paths } } = this.props;
    const routeTabs = [];

    paths.map(path => {
      const curRoutes = this.getCurRoutes(routes, path);
      routeTabs.push({
        path: curRoutes[0].path + (curRoutes.length > 1 ? curRoutes[1].path : ''),
        name: curRoutes[0].name + (curRoutes.length > 1 ? ('-' + curRoutes[1].name) : '')
      })
    });

    return (
      <PageTabs 
        tabItems={routeTabs} activePath={location.pathname}
        onClick={tab => this.handleClickTab(tab.props.name)}
        onClose={tab => this.handleCloseTab(tab.props.name) }/>
    );
  }

  /**
   * 点击设置的处理
   */
  handleSetting = () => {
    this.setState({ setting: true });
  }

  /**
   * 点击Tab
   */
  handleClickTab = path => {
    this.props.route.history.replace(path);
  }

  /**
   * 点击账户下拉框
   */
  handleClickAccountItem = command => {
    if (command == 'logout') {
      this.handleLogout();
    } else {
      this.props.history.push(command);
    }
  }

  /**
   * 点击退出登录
   */
  handleLogout = () => {
    this.props.auth.logout();
    this.props.history.replace('/user/login');
  }

  /**
   * 点击关闭Tab
   */
  handleCloseTab = path => {
    this.props.history.goBack();
  }

  /**
   * 点击菜单项的回调
   * path： 选中的path
   */
  handleMenuClick = path => {
    this.props.history.push(path);
  }

  getCurRoutes = (routes, pathname) => {

    const curRoutes = [];
    const pathNames = pathname.split('/').slice(1);
    const pathName = '/' + pathNames[0];
    for (let i = 0; i < routes.length; i++) {

      const route = routes[i];
      if (route.path == pathName) {
        curRoutes.push(route);
        if (route.children) {
          curRoutes.push(route.children.find(childRoute => childRoute.path == ('/' + pathNames[1])));
        }
        break;
      }
    }

    return curRoutes;
  }
}

export default BasicLayout;