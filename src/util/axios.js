import axios from 'axios';
import { Message } from 'element-ui';

const instance = getDefaultInstance();

export function getJson(url, data) {
  return instance.get(url, { params: data });
}

export function postJson(url, data) {
  return instance.post(url, data);
}

export function postFormData(url, data) {
  instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
  return instance.post(url, data);
}

export function deleteJson(url) {
  return instance.delete(url);
}

export function putJson(url, data) {
  return instance.put(url, data);
}

function getDefaultInstance() {
  const instance = axios.create({
    baseURL: '/',
  });

  // instance.interceptors.request.use(config => {});

  instance.interceptors.response.use(
    res => {
      if (res.data.code !== 200) {
        return res.data;
      } else {
        return res.data.data;
      }
    },
    err => {
      let message = err.message;
      if (err.response.status === 422) {
        message = '参数错误';
      }
      Message.error(message);
      throw err;
    },
  );

  return instance;
}
