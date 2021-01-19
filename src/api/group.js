import { getJson, postJson, deleteJson, putJson, exportFileData } from '../util/axios';

export const getGroupData = data => getJson('/api/apiPage/group', data);

export const createGroupData = data => postJson('/api/apiPage/group', data);

export const exportGroupData = data => exportFileData('/api/apiPage/group/export', data);

export const updateGroupData = data => putJson(`/api/apiPage/group/`, data);

export const deleteGroupData = data => deleteJson(`/api/apiPage/group/${data}`);
