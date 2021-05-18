import Vue from "vue";
import ViewUI from "view-design";

ViewUI.Message.config({ duration: 3 });

import locale from "view-design/dist/locale/en-US";

Vue.use(ViewUI, {
  locale,
});
