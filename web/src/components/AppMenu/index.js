import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'element-react'
import Icon from '../Icon';

import styles from './index.module.scss';

export default class AppMenu extends React.Component {

  static props = {
    menu: PropTypes.array.isRequired,
    onClickItem: PropTypes.func.isRequired,
    activeKey: PropTypes.string.isRequired
  };

  static defaultProps = {
    menu: [],
    activeKey: ''
  }

  render() {

    const { menu, activeKey } = this.props;

    return (
      <Menu className={styles.menu} defaultActive={activeKey} mode='vertical' theme='dark'
        onSelect={index => this.handleSelectMenuItem(index)}>
        {
          menu.filter(menuItem => !menuItem.hidden).map(menuItem => {

            if (!menuItem.children) {
              return (
                <Menu.Item key={menuItem.path} index={menuItem.path}>
                  {this.renderMenuTitle(menuItem)}
                </Menu.Item>
              );
            } 
            else {
              return (
                <Menu.SubMenu key={menuItem.path} title={this.renderMenuTitle(menuItem)} index={menuItem.path}>
                  {
                    menuItem.children.filter(childMenuItem => !childMenuItem.hidden).map(childMenuItem => (
                      <Menu.Item key={childMenuItem.path} index={menuItem.path + childMenuItem.path}>
                        {this.renderMenuTitle(childMenuItem)}
                      </Menu.Item>
                    ))
                  }
                </Menu.SubMenu>
              )
            }
          })
        }
      </Menu>
    );
  }

  renderMenuTitle = menuItem => {
    return (
      <span className={styles.item}>
        { menuItem.icon ? <Icon className={styles.itemIcon} type={menuItem.icon} /> : <span /> }
        { menuItem.name }
      </span>
    )
  }

  /**
   * 点击菜单项的回调
   */
  handleSelectMenuItem = index => {
    const { onClickItem } = this.props;
    onClickItem && onClickItem(index);
  }
}