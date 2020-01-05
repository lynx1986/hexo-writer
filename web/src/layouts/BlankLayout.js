import React from 'react';

import styles from './BlankLayout.module.scss';

class BlankLayout extends React.Component {

  render() {
    return (
      <div className='layout'>
        { this.props.children }
      </div>
    )
  }
}

export default BlankLayout;