import { getJson, postJson, deleteJson, putJson } from '../util/axios';

export const getEnvData = data => getJson('/api/envPage', data);

export const createEnvData = data => postJson('/api/envPage', data);

export const updateEnvData = data => putJson('/api/envPage', data);

export const deleteEnvData = id => deleteJson(`/api/envPage/${id}`);
