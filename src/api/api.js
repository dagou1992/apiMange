import { getJson, postJson, deleteJson, putJson } from '../util/axios';

export const getApiData = data => getJson('/api/apiPage', data);

export const createApiData = data => postJson('/api/apiPage', data);

export const updateApiData = data => putJson('/api/apiPage/', data);

export const deleteApiData = data =>
  deleteJson(`/api/apiPage/${data.group}/${data.id}`);
