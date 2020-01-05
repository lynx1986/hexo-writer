import React from 'react';
import { observer, inject } from 'mobx-react';
import { Tabs, Tag } from 'element-react';

import Icon from '@/components/Icon';

import styles from './index.module.scss';
import IconFonts from '@/assets/iconfont/iconfont.json';

@inject(stores => ({
  app: stores.app
}))
@observer
class IconPage extends React.Component {

  render() {

    const iconType = IconFonts.glyphs[0].font_class;

    return (
      <div className='page-content'>
        <div>
          <Tag type='primary'>自定义图标</Tag>
        </div>
        <p />
        <div>
          <Icon type={iconType} size={30} />
          <span style={{marginRight: 8}} />
          <Icon type={iconType} size={30} color='#20a0ff' />
          <span style={{marginRight: 8}} />
          <Icon type={iconType} size={30} color='#20a0ff' border />
          <span style={{marginRight: 8}} />
          <Icon type={iconType} size={30} color='#20a0ff' border shape='circle' />
        </div>
        <div className={styles.divider} />
        <div>
          <Tag type='primary'>图标集合</Tag>
        </div>
        <p />
        <Tabs type='border-card' activeName='1'>
          <Tabs.Pane label='iconfont' className={styles.tabContent} name='1'>
            {
              IconFonts.glyphs.map(icon => 
                <div key={icon.unicode} className={styles.item}>
                  <Icon type={icon.font_class} size={40} />
                  <span className={styles.name}>{icon.font_class}</span>
                </div>
              )
            }
          </Tabs.Pane>
          <Tabs.Pane label='element-ui' className={styles.tabContent} name='2'>
            
          </Tabs.Pane>
        </Tabs>
        
      </div>
    )
  }
}

export default IconPage;