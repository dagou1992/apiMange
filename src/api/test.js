import { deleteJson, getJson, postJson, postFormData } from '../util/axios';

export const submitToTest = data => {
  const url = '/api/testPage';
  const isFormData =
    Object.prototype.toString.call(data) === '[object FormData]';
  return isFormData ? postFormData(url, data) : postJson(url, data);
};

export const getApiHistory = data => getJson('/api/testPage/history', data);

export const submitToSaveApiHistory = data =>
  postJson('/api/testPage/history', data);

export const clearHistoryData = () => deleteJson('/api/testPage/history');
