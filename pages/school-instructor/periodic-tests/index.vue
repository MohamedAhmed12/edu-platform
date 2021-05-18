<template>
  <div class="subject-section container">
    <div class="row">
      <h1 class="col-12">
        {{ $t("periodic_tests") }}
      </h1>
      <div class="col-12 m-t-10 m-b-20">
        <nuxt-link class="btn btn-primary" to="periodic-tests/create">
          {{ $t("Create") }}
        </nuxt-link>
      </div>
      <div
        v-for="periodic_test in periodic_tests"
        v-key="getRandomKey()"
        class="col-12 col-lg-3"
      >
        <div class="btn-group">
          <nuxt-link
            class="btn btn-success"
            :disabled="periodic_test.is_published"
            :to="`periodic-tests/${periodic_test.id}/edit`"
          >
            {{ $t("Edit") }}
          </nuxt-link>
          <nuxt-link
            v-if="!periodic_test.is_published"
            class="btn btn-info"
            :to="`periodic-tests/${periodic_test.id}/publish`"
          >
            {{ $t("Publish") }}
          </nuxt-link>
          <nuxt-link
            class="btn btn-danger"
            :disabled="periodic_test.is_published"
            :to="`periodic-tests/${periodic_test.id}/delete`"
          >
            {{ $t("Delete") }}
          </nuxt-link>
          <nuxt-link
            v-if="periodic_test.is_published"
            class="btn btn-success"
            :to="`periodic-tests/${periodic_test.id}/students`"
          >
            {{ $t("Results") }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Formatter } from "sarala-json-api-data-formatter";
import "~/assets/css/subject-view.css";

export default {
  name: "StudentPeriodicTest",
  layout: "school-instructor",
  data: function () {
    return {
      periodic_tests: [],
    };
  },
  mounted() {
    this.getPeriodicTests();
  },
  methods: {
    //================================================
    // Main Functions
    //================================================
    getPeriodicTests() {
      this.$axios
        .get(`/periodic-test`)
        .then(this.handleGettingPeriodicTests)
        .catch((error) => console.log(error));
    },
    //================================================
    // Secondary Functions
    //================================================
    handleGettingPeriodicTests(response) {
      let formatter = new Formatter();
      this.periodic_tests = formatter.deserialize(response.data).data;
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
