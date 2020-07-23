import { getJson, postJson, deleteJson, putJson } from '../util/axios';

export const getGroupData = data => getJson('/api/apiPage/group', data);

export const createGroupData = data => postJson('/api/apiPage/group', data);

export const updateGroupData = data => putJson(`/api/apiPage/group/`, data);

export const deleteGroupData = data => deleteJson(`/api/apiPage/group/${data}`);
