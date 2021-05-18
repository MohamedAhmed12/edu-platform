<template>
  <div>
    <h3 class="title-font">
      {{ $t("Virtual class rooms") }}
    </h3>
    <div class="row">
      <div class="col-sm-12">
        <iframe
          v-if="vcrSession.join_url"
          height="600"
          :src="vcrSession.join_url"
          width="100%"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Formatter } from "sarala-json-api-data-formatter";
export default {
  layout: "default",
  data() {
    return {
      vcrSession: [],
      formatter: new Formatter(),
    };
  },
  beforeCreate() {
    this.$axios
      .get(`student/vcr/view-session/${this.$route.params.id}`)
      .then((response) => {
        console.log(response.data);
        this.vcrSession = this.formatter.deserialize(response.data);
        console.log(this.vcrSession.join_url);
      });
  },
};
</script>
