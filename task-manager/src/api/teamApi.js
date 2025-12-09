// src/api/teamApi.js

export const getTeam = () => {
  return Promise.resolve([]);
};

export const addTeamMemberApi = (member) => {
  return Promise.resolve({ ...member, id: Date.now() });
};

export const removeTeamMemberApi = (id) => {
  return Promise.resolve(true);
};

export const updateTeamMemberApi = (id, updates) => {
  return Promise.resolve({ id, ...updates });
};
