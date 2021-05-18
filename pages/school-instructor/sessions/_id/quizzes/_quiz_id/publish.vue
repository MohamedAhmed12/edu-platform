<template>
  <div class="row m-0 p-0">
    <div class="row">
      <div class="col-12">
        <h2>{{ $t("Are You Sure ?") }}</h2>
      </div>
      <div class="col-12">
        <div class="btn-group">
          <button class="btn btn-success" @click="publish">
            {{ $t("Confirm") }}
          </button>
          <button class="btn btn-danger" @click="cancel">
            {{ $t("Cancel") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Formatter } from "sarala-json-api-data-formatter";

export default {
  components: {},
  layout: "default",
  methods: {
    cancel: function () {
      this.$router.go(-1);
    },
    publish: function () {
      let vm = this;
      this.$axios
        .get(`quizzes/publish/${this.$route.params.quiz_id}`)
        .then((response) => {
          console.log(response);
          vm.$toast.success(vm.$t("Publish Successfully"));
          vm.$router.go(-1);
        })
        .catch((response) => {
          console.log(response);
          vm.$toast.error(vm.$t("Failed"));
          vm.$router.go(-1);
        });
    },
  },
};
</script>
