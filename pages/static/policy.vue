<template>
  <div>
    <div class="row">
      <div class="col-md-12 text-center">
        <h1 class="mb-2">
          {{ page.title }}
        </h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 text-center">
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
      page: Object,
    };
  },
  created() {
    this.getPage();
  },
  methods: {
    getPage() {
      this.$axios
        .get("static-pages/privacy-policy")
        .then((response) => {
          this.page = this.formatter.deserialize(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
