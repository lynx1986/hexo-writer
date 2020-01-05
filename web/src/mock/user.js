import Mock from 'mockjs';

Mock.setup({ timeout: '100-600' });
const refreshMock = Mock.mock(/api\/user\?/, 'get', {
  errcode: 0,
  errmsg: '',
  data: {
     'items|10': [{
       'id|+1': 1,
       'name': '@cname',
       'name_en': '@first',
       'gender|1': ['0', '1'],
       'birthday': '@date',
       'email': '@email',
       'words': '@csentence'
     }],
     'total|200-300': 250
  }
});

const removeMock = Mock.mock(/api\/user/, 'delete', {
  errcode: 0,
  errmsg: '',
});

const createMock = Mock.mock(/api\/user/, 'post', {
  errcode: 0,
  errmsg: '',
  data: {
    'item': {
      'id|+1': 1,
      'name': '@cname',
      'name_en': '@first',
      'gender|1': ['男', '女'],
      'birthday': '@date',
      'email': '@email',
      'words': '@csentence'
    }
  }
});

const validateMock = Mock.mock(/api\/user\/validate\?/, 'get', {
  'errcode|1': ['0', '1'],
  errmsg: '',
})

const updateMock = Mock.mock(/api\/user/, 'put', {
  errcode: 0,
  errmsg: '',
});

export default [validateMock, refreshMock, removeMock, createMock, updateMock];