import Vue from "vue";
import chunk from "lodash.chunk";

export default (_) => {
  Array.prototype.chunk = function (size) {
    return chunk(this, size);
  };

  Vue.prototype.chunk = chunk;
};
