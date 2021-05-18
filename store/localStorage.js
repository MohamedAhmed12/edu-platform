export const state = () => ({
  userType: null,
  singleFeedback: null,
});

export const getters = {
  userType: (state) => {
    return state.userType;
  },
  singleFeedback: (state) => {
    return state.singleFeedback;
  },
};

export const mutations = {
  SET_USER_TYPE(state, type) {
    state.userType = type;
  },
  SET_SINGLEFEEDBACK(state, singleFeedback) {
    state.singleFeedback = singleFeedback;
  },
};
