import React from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Button, Loading, Pagination, MessageBox, Message, Dialog } from 'element-react';

import UserForm from './form';
import styles from './index.module.scss';

@inject(stores => ({
  user: stores.user
}))
@observer
class UserPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      detail: {},
      editing: false
    };

    this.COLUMNS = [
      ...USER_COLUMNS,
      { 
        label: '操作', width: 180,
        render: data => {
        return (
          <span>
            <Button plain type='info' size='small' onClick={() => this.handleEdit(data)}>编辑</Button>
            <Button type='danger' size='small' onClick={() => this.handleRemove(data)}>删除</Button>
          </span>
        )
      }}
    ];
    this.COLUMNS[3].render = data => <span>{data.gender == '0' ? '女' : '男'}</span>
  }

  componentDidMount() {
    this.props.user.refresh();
  }

  render() {

    return (
      <div className={'page-content ' + styles.page}>
        { this.renderActionBar() }
        { this.renderTable() }
        { this.renderDialog() }
      </div>
    )
  }

  renderActionBar() {

    return (
      <div className={styles.actionBar}>
        <Button type='primary' onClick={this.handleCreate}>创建</Button>
      </div>
    )
  }

  renderDialog() {

    const { detail, editing} = this.state;
    const { validating } = this.props.user.status();

    return (
      <Dialog size='tiny' title={detail.id ? "编辑用户" : "创建用户"} visible={editing} onCancel={() => this.setState({ editing: false, detail: {} })}>
        <Dialog.Body>
          <UserForm 
            ref='form' item={detail} validating={validating}
            onFieldChange={this.handleFieldChange} 
            onFieldValide={this.handleFieldValidate}
          />
        </Dialog.Body>
        <Dialog.Footer>
          <Button onClick={ () => this.setState({ editing: false, detail: {} }) }>取 消</Button>
          <Button type="primary" onClick={this.handleSubmit}>确 定</Button>
        </Dialog.Footer>
      </Dialog>
    );
  }

  renderTable() {

    const items = this.props.user.items();
    const page = this.props.user.page();

    return (
      <div style={{width: '100%'}}>
        <Loading className={styles.loading} text='加载中' loading={this.props.user.basic.status.refreshing}>
          <Table className={styles.table} columns={this.COLUMNS} data={items} stripe />
        </Loading>
        <Pagination 
          className={styles.pagination} layout='prev, pager, next' 
          total={page.total} pageSize={page.limit} currentPage={page.current + 1}
          onCurrentChange={this.handleCurrentChange} />
      </div>
    );
  }

  handleSubmit = () => {

    this.refs.form.validate(() => {

      // 校验通过则关闭模态框
      const detail = this.state.detail;
      this.setState({ editing: false, detail: {} });

      // 更新
      if (detail && detail.id) {
        this.props.user.update({
          params: detail,
          callback: {
            success: () => {
              Message({ type: 'success', message: '更新成功' });
              this.props.user.refresh();
            },
            fail: () => Message({ type: 'error', message: '更新失败' })
          }
        })
      }
      // 创建
      else {
        this.props.user.create({
          params: detail,
          callback: {
            success: () => {
              Message({ type: 'success', message: '创建成功' });
              this.props.user.refresh();
            },
            fail: () => Message({ type: 'error', message: '创建失败' })
          }
        })
      }

      
    });
  }

  /**
   * 校验表单域
   */
  handleFieldValidate = (value, cb) => {
    this.props.user.validate({
      params: { name: value },
      callback: {
        success: () => cb(true),
        fail: () => cb(false)
      }
    });
  }

  handleFieldChange = (name, value) => {
    const { detail } = this.state;
    detail[name] = value;
    this.setState({ detail });
  }

  handleCreate = item => {
    this.setState({ editing: true });
  }

  handleEdit = item => {

    this.props.history.push('/page/user/' + item.id);
    // this.setState({ detail: item, editing: true });
  }

  handleRemove = item => {
    MessageBox.confirm('确定要删除用户：' + item.name + ' 吗？', '删除用户', { type: 'warning' })
              .then(() => 
                this.props.user.remove({ 
                  params: { id: item.id },
                  callback: {
                    success: () => {
                      this.props.user.refresh();
                      Message({ type: 'success', message: '删除成功' })
                    },
                    fail: () => Message({ type: 'error', message: '删除失败' })
                  }
                })
              )
              .catch(() => {});
  }

  handleCurrentChange = current => {

    const page = this.props.user.page();
    this.props.user.refresh({
      params: { current: current - 1, limit: page.limit }
    });
  }
  
}


const USER_COLUMNS = [
  { label: 'ID', prop: 'id', width: 120 },
  { label: '中文名', prop: 'name', width: 120 },
  { label: '英文名', prop: 'name_en', width: 180 },
  { label: '性别', prop: 'gender', width: 100 },
  { label: '生日', prop: 'birthday', width: 160 },
  { label: '邮箱', prop: 'email', width: 240 },
  { label: '名言', prop: 'words' }
];

export default UserPage;