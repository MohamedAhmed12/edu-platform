import Vue from "vue";
import * as Fingerprint2 from "fingerprintjs2";

Vue.prototype.$fingerprint = Fingerprint2;

// Vue.prototype.$trimTitle = (string, limit) =>
//   string.length > limit ? string.substring(0, limit) + "..." : string;

Vue.filter("decimalConvert", (value) => {
  if (value === undefined) return;
  if (value.toString().length >= 3) return value.toFixed(1);
  else return value + ".0";
});
Vue.prototype.$trimTitle = (string, max, delimiter = "...") => {
  delimiter = delimiter || "&hellip;";
  return string.length > length ? string.substr(0, length) + delimiter : string;
};
Vue.prototype.$truncateMiddle = (word, max = 10, ellipsis = "...") => {
  const tooLongChars = max; // arbitrary

  if (word.length < tooLongChars) {
    return word;
  }

  const charsOnEitherSide = Math.floor(tooLongChars / 2) - ellipsis.length;

  return (
    word.slice(0, charsOnEitherSide) + ellipsis + word.slice(-charsOnEitherSide)
  );
};
