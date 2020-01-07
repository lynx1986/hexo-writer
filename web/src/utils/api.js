import axios from 'axios';
import Constants from '../Constants';

const HEADERS = {}

const request = async function(url, method='GET', data) {

  const headers = HEADERS;

  const token = window.localStorage.getItem(Constants.TOKEN);
  console.log('取得token=' + token);
  if (token) {
    headers[Constants.JWT_NAME] = token;
  }

  return new Promise(resolve => {

    console.log('发起请求，METHOD=' + method + ' URL=' + url, data);
    axios.request({ url, method, headers, data })
        .then(res => {
          console.log('收到应答，结果=', res);
          const { errcode, errmsg, data } = res.data;
          const result = {
            code: errcode == 0 ? 200 : errcode,
            msg: errmsg,
            data: data
          };

          resolve(result);
        })
        .catch(err => {
          console.log('请求失败');
          resolve({ code: 500, data: null, msg: 'Network Error' });
        });
  })
}

export default { request };