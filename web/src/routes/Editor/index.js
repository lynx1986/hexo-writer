import React from 'react';
import { inject, observer } from 'mobx-react';
import { Layout, Alert, Tag } from 'element-react';
import Markdown from 'for-editor';
import RichEditor from 'braft-editor';

import 'braft-editor/dist/index.css';
import styles from './index.module.scss';

@inject(stores => ({
  app: stores.app
}))
@observer
class EditorPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mdText: '# This is a header\n\nAnd this is a paragraph',
      richText: RichEditor.createEditorState('')
    }
  }

  render() {
    return (
      <div className='page-content'>
        <Layout.Row type='flex' justify='center'>
          <Layout.Col>
            <Tag type='primary'>Markdown编辑器</Tag>
            <p />
            <Markdown height='400px' preview subfield value={this.state.mdText} onChange={v => this.setState({ mdText: v })} />
          </Layout.Col>
        </Layout.Row>
        <div className={styles.divider} />
        <Layout.Row type='flex' justify='center'>
          <Layout.Col>
            <Tag type='primary'>富文本编辑器</Tag>
            <p />
            <RichEditor className={styles.richEditor} value={this.state.richText} onChange={richText => this.setState({ richText })} />
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
  
}

export default EditorPage;