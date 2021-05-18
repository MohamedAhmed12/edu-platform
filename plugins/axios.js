import StudentApi from "@/apis/student";
import InstractorApi from "@/apis/instructor";

const store2 = require("store2");
const lang = store2.get("lang") || "en";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const st = new Vuex.Store({
  state: {
    loading: false,
  },
  mutations: {
    isloading(state) {
      state.loading = true;
    },
    afterloading(state) {
      state.loading = false;
    },
    after(state) {
      state.loading = false;
    },
  },
  getters: {
    loading: (state) => {
      return state.loading;
    },
  },
});
export default function ({ $axios, store }) {
  $axios.student = StudentApi($axios);
  $axios.instructor = InstractorApi($axios);

  $axios.onRequest((config) => {
    // st.commit("isloading");
    config.baseURL = config.baseURL.replace("/ar", "");
    config.baseURL = config.baseURL.replace("/en", "");
    config.baseURL = config.baseURL + "/" + store.state.i18n.locale + "/";
    return config;
  });
  $axios.onResponse(function (response) {
    // Do something with response data
    // st.commit("afterloading");
    return response;
  });
  $axios.onError((error) => {
    // st.commit("afterloading");
    return Promise.reject(error);
  });
}
