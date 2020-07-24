import { getJson, postJson, deleteJson, putJson } from '../util/axios';

export const getDataStructure = data => getJson('/api/dataStructurePage', data);

export const createDataStructure = data =>
  postJson('/api/dataStructurePage', data);

export const updateDataStructure = data =>
  putJson('/api/dataStructurePage', data);

export const deleteDataStructure = id =>
  deleteJson(`/api/dataStructurePage/${id}`);
