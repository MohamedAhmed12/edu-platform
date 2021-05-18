<template>
  <div class="subject-section container">
    <div class="row">
      <h1 class="col-12">
        {{ $t("periodic_tests") }}
      </h1>
      <div
        v-for="periodicTest in periodicTests"
        v-key="getRandomKey()"
        class="col-12 col-lg-3"
      >
        <nuxt-link
          class="btn btn-success"
          :disabled="periodicTest.status === 'finished'"
          :to="`periodic-test/${periodicTest.id}`"
        >
          {{ periodicTest.id }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Formatter } from "sarala-json-api-data-formatter";
import "~/assets/css/subject-view.css";

export default {
  name: "StudentPeriodicTest",
  data: function () {
    return {
      periodicTests: [],
    };
  },
  mounted() {
    this.getPeriodicTests();
  },
  beforeRouteLeave: function (to, from, next) {
    if (this.isUrlContainPeriodicTestIdParam(to)) {
      let confirmed = confirm(this.$t("Are you sure ?"));
      if (confirmed) next();
      return;
    }
    next();
  },
  methods: {
    //================================================
    // Main Functions
    //================================================
    getPeriodicTests() {
      this.$axios
        .get(`student/periodic-test`)
        .then(this.handleGettingPeriodicTests)
        .catch((error) => console.log(error));
    },
    //================================================
    // Secondary Functions
    //================================================
    handleGettingPeriodicTests(response) {
      let formatter = new Formatter();
      this.periodicTests = formatter.deserialize(response.data).data;
    },
    isUrlContainPeriodicTestIdParam(to) {
      return this.validateNestedProperties(to, "params", "periodic_test_id");
    },
    //================================================
    // Helper Functions
    //================================================
    getRandomKey() {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for (let i = 0; i < charactersLength; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    validateNestedProperties(obj, level, ...rest) {
      if (obj === undefined) return false;
      // eslint-disable-next-line no-prototype-builtins
      if (rest.length === 0 && obj.hasOwnProperty(level)) return true;
      return this.validateNestedProperties(obj[level], ...rest);
    },
  },
};
</script>
