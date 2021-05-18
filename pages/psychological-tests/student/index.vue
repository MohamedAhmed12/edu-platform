<template>
  <section class="subjects">
    <div class="row">
      <div class="col-12 p-0">
        <h3 class="title-font">
          {{ $t("psychological_tests") }}
        </h3>
      </div>
      <ListTestItem v-for="(item, i) in items" :key="i" :item="item" />
    </div>
  </section>
</template>

<script>
import ListTestItem from "~/components/psychological-tests/student/list-test-item";

import { Formatter } from "sarala-json-api-data-formatter";
import "~/assets/css/Psychological.css";
export default {
  name: "Index",
  components: { ListTestItem },
  layout: "default",
  data() {
    return {
      items: [],
      formatter: new Formatter(),
    };
  },
  head: {},
  mounted() {
    this.getPsychologicalTests();
  },
  methods: {
    getPsychologicalTests() {
      this.$axios
        .get("/student/psychological-tests")
        .then(({ data }) => {
          this.items = this.formatter.deserialize(data).data;
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
};
</script>

<style scoped></style>
