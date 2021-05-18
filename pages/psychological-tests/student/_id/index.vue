<template>
  <section class="subjects">
    <ShowTestItem v-if="item" :item="item" />
  </section>
</template>

<script>
import "~/assets/css/Psychological.css";

import { Formatter } from "sarala-json-api-data-formatter";
import ShowTestItem from "~/components/psychological-tests/student/show-test-item";

export default {
  name: "Index",
  components: { ShowTestItem },
  layout: "default",
  data() {
    return {
      item: null,
      formatter: new Formatter(),
    };
  },
  head: {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .get("/student/psychological-tests/" + this.$route.params.id)
        .then(({ data }) => {
          this.item = this.formatter.deserialize(data);
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
};
</script>

<style scoped></style>
