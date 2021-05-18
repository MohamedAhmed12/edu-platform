const store2 = require("store2");

export const state = () => ({
  locales: ["en", "ar"],
  // locale: store2.get("lang") || "en",
  user: null,
  loading: false,
});
export const getters = {
  loading: (state) => {
    return state.loading;
  },
  userType: (state) => {
    return state.userType;
  },
};
//commit('SET_USER', req.session.user)
export const mutations = {
  SET_USER(state, data) {
    state.user = data.attributes;
    state.id = data.id;
    state.type = data.type;
    state.token = data.meta.token;
  },
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale;
    }
  },
};
