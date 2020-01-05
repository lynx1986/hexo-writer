import React from 'react';
import 'element-theme-default';
// import 'element-theme-dark';
// import './assets/style/themes/custom/index.css';

import './App.scss';
import './assets/iconfont/iconfont.css';

import './mock';

import { Provider } from 'mobx-react';

import Router from './routes';
import stores from './stores';

function App() {
  return (
    <Provider {...stores}>
      <Router />
    </Provider>
  );
}

export default App;
