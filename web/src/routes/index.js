import React from 'react';
import { Route,  Router, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory, createHashHistory } from "history";
import { observer, inject, toJS } from 'mobx-react';


import BasicLayout from '@/layouts/BasicLayout';
import BlankLayout from '@/layouts/BlankLayout';

import Home from './Home';
import Icon from './Icon';
import Editor from './Editor';

import PostIndex from './Post/index';
import PostDetail from './Post/detail';

import ConfigIndex from './Config/index';

import Login from './Login';
import Page404 from './NotFound';
import User from './User';
import UserDetail from './User/detail';


const blankRoutes = [
  { path: '/user/login', name: '登录', layout: BlankLayout, component: Login }
];

const basicRoutes = [
  { path: '/', name: '首页', layout: BasicLayout, icon: 'all', component: Home },
  { path: '/post', name: '文章', layout: BasicLayout, icon: 'editor', component: PostIndex },
  { path: '/post/:slug', name: '文章详情', layout: BasicLayout, component: PostDetail, hidden: true },
  { path: '/config', name: '配置', layout: BasicLayout, icon: 'atm', component: ConfigIndex },
  // { 
  //   path: '/component', name: '组件', layout: BasicLayout, icon: 'similar-product', 
  //   children: [
  //     { path: '/icon', name: '图标', layout: BasicLayout, component: Icon, icon: 'atm' },
  //     { path: '/editor', name: '编辑器', layout: BasicLayout, component: Editor, icon: 'editor' },
  //   ]
  // },
  // {
  //   path: '/page', name: '页面', layout: BasicLayout, icon: 'form',
  //   children: [
  //     { path: '/notFound', name: '404', component: Page404, icon: 'cry' },
  //     { path: '/user', name: '用户管理', component: User, icon: 'Customermanagement' },
  //     { path: '/user/:id', name: '用户详情', component: UserDetail, hidden: true },
  //   ]
  // }
];

function getRouteInfos(routes) {
  const routeInfos = [];
  routes.forEach(route => {
    if (route.children) {
      routeInfos.push(...route.children.map(cRoute => ({ key: cRoute.path, path: route.path + cRoute.path, component: cRoute.component })));
    } else {
      routeInfos.push({ key: route.path, path: route.path, component: route.component });
    }
  })
  return routeInfos;
}

const basicRouteInfos = getRouteInfos(basicRoutes);
const blankRouteInfos = getRouteInfos(blankRoutes);

@inject(stores => ({
  route: stores.route
}))
@observer
class PageRoutes extends React.Component {

  constructor(props) {
    super(props);
    this.history = createHashHistory({ basename: '' });
    this.props.route.init(this.history);
  }

  render() {

    return (
      <Router history={(this.history)}>
        <Switch>
          <Route path="/user" component={props => (
            <BlankLayout {...props} routes={blankRoutes}>
              { blankRouteInfos.map(routeInfo => <Route exact key={routeInfo.path} path={routeInfo.path} component={routeInfo.component} {...props} /> ) }
            </BlankLayout>
          )}>
          </Route>
          <Route path="/" component={props => (
            <BasicLayout {...props} routes={basicRoutes}>
              <Switch>
                { basicRouteInfos.map(routeInfo => <Route exact key={routeInfo.path} path={routeInfo.path} component={routeInfo.component} {...props} /> ) }
                <Redirect to="/page/notFound" />
              </Switch>
            </BasicLayout>
          )}>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default PageRoutes