import React from 'react';
import { observer, inject } from 'mobx-react';
import { Form, Input, Button, Layout, Message } from 'element-react';

import styles from './index.module.scss';

@inject(stores => ({
  app: stores.app,
  auth: stores.auth
}))
@observer
class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      form: { username: '', password: '' }
    };
  }

  componentDidMount() {
    this.props.auth.fetchToken();
  }

  render() {
    return (
      <div className={'page page-center ' + styles.page}>
        <Layout.Row className={styles.form} justify='center' align='center'>
          <Layout.Col span='4' offset='10'>
            <Form model={this.state.form}>
              <Form.Item>
                <Input className={styles.itemInput} value={this.state.form.username} placeholder='admin' onChange={v => this.onFormValueChange('username', v)} />
              </Form.Item>
              <Form.Item>
                <Input type='password' className={styles.itemInput} value={this.state.form.password} placeholder='admin' onChange={v => this.onFormValueChange('password', v)} />
              </Form.Item>
              <Form.Item>
                <Button type='primary' onClick={this.handleLogin}>登录</Button>
              </Form.Item>
            </Form>
          </Layout.Col>
        </Layout.Row>
        
      </div>
    )
  }

  onFormValueChange = (name, value) => {
    const form = this.state.form;
    form[name] = value;
    this.setState({ form });
  }

  handleLogin = () => {

    const { form } = this.state;

    this.props.auth.login({
      params: form,
      callback: {
        success: () => {
          Message({ message: '登录成功', type: 'success', duration: 1000, onClose: () => this.props.history.push('/') });
        }
      }
    });
  }
}

export default Login;