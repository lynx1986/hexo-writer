import React from 'react';
import { PropTypes } from 'prop-types';
import { Tag, Tabs } from 'element-react'

export default class PageTabs extends React.PureComponent {

  static props = {
    tabItems: PropTypes.array.isRequired,
    activePath: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
  };

  static defaultProps = {
    tabItems: [],
    activePath: ''
  }

  render() {

    const { tabItems, activePath, onClose, onClick } = this.props;
    console.log('PagerTabs items=', tabItems, activePath)

    return (
      <Tabs type='card' value={activePath} onTabClick={onClick} onTabRemove={onClose}>
        {
          tabItems.map(item =>
            <Tabs.Pane 
              key={item.path} 
              closable={item.path != '/' && item.path == activePath}
              label={item.name} 
              name={item.path} 
              >
            </Tabs.Pane>
          )
        }
      </Tabs>
    )
  }
}