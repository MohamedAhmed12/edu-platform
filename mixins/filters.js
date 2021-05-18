export default {
  filters: {
    decimalConvert: function (value) {
      console.log(value);
      if (value.toString().length >= 3) return value.toFixed(1);
      else return value + ".0";
    },
  },
};
