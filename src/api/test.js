import { deleteJson, getJson, postJson, postFormData } from '../util/axios';

export const submitToTest = data => {
  const body = data.requestParam.body;
  if (body && body.model === 'binary') {
    const formData = new FormData();
    Object.entries(data).forEach(item => {
      const [key, value] = item;
      if (key === 'requestParam') {
        formData.append(value.body.data.name, value.body.data.value);
        Object.entries(value).forEach(s => {
          const [k, v] = s;
          formData.append(k, JSON.stringify(v));
        });
      } else {
        formData.append(key, value);
      }
    });
    return postFormData('/api/testPage', formData);
  } else {
    return postJson('/api/testPage', data);
  }
};

export const getApiHistory = data => getJson('/api/testPage/history', data);

export const submitToSaveApiHistory = data =>
  postJson('/api/testPage/history', data);

export const clearHistoryData = () => deleteJson('/api/testPage/history');
