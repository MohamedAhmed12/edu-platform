export const state = () => ({
  logs: [],
  activitySubjectLogs: [],
  SubjectLogs: [],
  time: [],
});
export const getters = {
  logs: (state) => {
    return state.logs;
  },
  activitySubjectLogs: (state) => {
    return state.activitySubjectLogs;
  },
  SubjectLogs: (state) => {
    return state.SubjectLogs;
  },
};

export const mutations = {
  SET_Log(state, paylod) {
    state.logs = paylod;
  },
  SET_activitySubjectLogs(state, paylod) {
    state.activitySubjectLogs = paylod;
  },
  SET_SubjectLogs(state, paylod) {
    state.SubjectLogs = paylod;
  },
};
