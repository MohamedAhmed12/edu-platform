<template>
  <div>
    <div class="row">
      <div class="col-12 text-center">
        <h1 class="mb-3">
          {{ page.title }}
        </h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <p v-html="page.body" />
      </div>
    </div>
  </div>
</template>

<script>
import "~/assets/css/Static-pages.css";
import "~/assets/css/footer.css";

import { Formatter } from "sarala-json-api-data-formatter";

export default {
  components: {
    // loader,
  },
  layout: "landing",
  auth: "guest",
  data() {
    return {
      formatter: new Formatter(),
      page: {},
    };
  },
  created() {
    this.getPage();
  },
  methods: {
    getPage() {
      this.$axios
        .get("static-pages/about?include=blocks")
        .then((response) => {
          this.page = this.formatter.deserialize(response.data);
          console.log(this.page);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
