export const state = () => ({
  show: null,
});

export const mutations = {
  SHOW(state, item) {
    state.show = item;
  },
};
