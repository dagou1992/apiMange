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

export function exportFileData(url, data) {
  return getExportInstance().post(url, data);
}

function getDefaultInstance() {
  const instance = axios.create({
    baseURL: '/',
    withCredentials: true,
  });

  // instance.interceptors.request.use(config => {});

  instance.interceptors.response.use(
    res => {
      if (res.data.code !== 200) {
        if (res.data.code === 200001) {
          window.location.href = `${res.data.msg}?from=${window.location.href}`;
        }
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

function getExportInstance() {
  const instance = axios.create({
    baseURL: '/',
    responseType: 'blob',
  });

  let fileName = '';

  instance.interceptors.request.use(config => {
    fileName = config.data.fileName + '.md';
    return config;
  });

  instance.interceptors.response.use(res => {
    let a = document.createElement('a');
    let url = window.URL.createObjectURL(res.data);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  });

  return instance;
}
