import React from 'react';

import icon404 from '@/assets/image/404.png';
import styles from './index.module.scss';

class Page404 extends React.Component {

  render() {
    return (
      <div className={styles.page}>
        <img src={icon404} />
      </div>
    )
  }
  
}

export default Page404;