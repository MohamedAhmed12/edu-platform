import Vue from "vue";
import VModal from "vue-js-modal/dist/ssr.nocss";

import "vue-js-modal/dist/styles.css";
Vue.use(VModal, {
  dynamicDefaults: {
    draggable: true,
    resizable: true,
    height: "auto",
  },
});
