import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, DatePicker } from 'element-react';
import dayjs from 'dayjs';

/**
 * 用户编辑表单
 */
export default class UserForm extends React.Component {

  static props = {
    item: PropTypes.object.isRequired,
    validating: PropTypes.bool.isRequired,
    onFieldValide: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
  };

  static props = {
    item: {},
    validating: false
  };

  constructor(props) {
    super(props);

    this.state = {};
    this.rules = { ...RULES };
    this.formValidating = false;

    // 添加重名的异步校验
    this.rules.name.push({
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入姓名'));
        } else {

          // 如果是点击【确认】时的检验，不再异步校验
          if (this.formValidating == true) {
            callback();
            return;
          }

          props.onFieldValide(value, valid => {
            if (!valid) {
              callback(new Error('已有同名用户'));
            } else {
              callback();
            }
          })
        }
      },
      trigger: 'blur'
    });
  }

  validate(callback) {
    
    this.formValidating = true;
    this.refs.form.validate((valid) => {
      this.formValidating = false;
      if (valid) {
        callback && callback();
      } else {
        return false;
      }
    });
  }

  render() {

    const { item, onFieldChange, validating } = this.props;

    return (
      <Form ref='form' model={item} rules={this.rules} labelWidth={100}>
        <Form.Item label='姓名' prop='name'>
          <Input value={item.name} onChange={v => onFieldChange('name', v)} autoComplete={false} icon={validating==true ? 'loading' : ''} />
        </Form.Item>
        <Form.Item label='英文名' prop='name_en'>
          <Input value={item.name_en} onChange={v => onFieldChange('name_en', v)} autoComplete={false} />
        </Form.Item>
        <Form.Item label='性别' prop='gender'>
          <Select value={item.gender} placeholder="请选择性别" onChange={v => onFieldChange('gender', v)}>
            <Select.Option label="女" value="0"></Select.Option>
            <Select.Option label="男" value="1"></Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='生日' prop='birthday'>
          <DatePicker value={item.birthday ? new Date(item.birthday) : null} onChange={v => onFieldChange('birthday', new dayjs(v).format('YYYY-MM-DD'))} />
        </Form.Item>
        <Form.Item label='邮箱' prop='email'>
          <Input value={item.email} onChange={v => onFieldChange('email', v)} autoComplete={false} />
        </Form.Item>
        <Form.Item label='名言' prop='words'>
          <Input value={item.words} onChange={v => onFieldChange('words', v)} autoComplete={false} />
        </Form.Item>
      </Form>
    );
  }
}

const RULES = {
  name: [{ required: true, message: '请输入姓名' }],
  name_en: [
    { required: true, message: '请输入英文名' },
    { validator: (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入英文名'));
      } else if (!/^[a-zA-Z.]/.test(value)) {
        callback(new Error('请输入英文字符或点[.]'))
      } else {
        callback();
      }
    }}
  ],
  gender: [{ required: true, message: '请选择性别' }],
  birthday: [{ required: true, message: '请选择生日' }],
  email: [
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
    { required: true, message: '请输入邮箱' },
  ],
  words: [{ required: true, message: '请输入名言' }]
};