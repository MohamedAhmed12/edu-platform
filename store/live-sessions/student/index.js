export const state = () => ({
  liveSession: {},
});

export const getters = {
  liveSession: (state) => {
    return state.liveSession;
  },
};

export const mutation = {
  SET_LIVESESSION(state, liveSession) {
    state.liveSession = liveSession;
  },
};

export const actions = {
  setLivesession({ commit }, liveSession) {
    commit("SET_LIVESESSION", liveSession);
  },
};
