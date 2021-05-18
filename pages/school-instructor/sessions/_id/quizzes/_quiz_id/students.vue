<template>
  <div class="questions-area bg-white">
    <Loader v-if="loading" />
    <div v-if="!loading" class="row mx-0 w-100">
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>{{ $t("ID") }}</th>
              <th>{{ $t("Student") }}</th>
              <th>{{ $t("Score") }}</th>
              <th>{{ $t("Answers") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result of results" v-key="result.id">
              <td scope="row">
                {{ result.id }}
              </td>
              <td>{{ result.student_name }}</td>
              <td>{{ result.quiz_result_percentage + "%" }}</td>
              <td>
                <nuxt-link :to="`answers/${result.student_id}`">
                  {{ $t("View Answers") }}
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { Formatter } from "sarala-json-api-data-formatter";
import Loader from "@/components/loader";

export default {
  name: "Students",
  components: {
    Loader,
  },
  data() {
    return {
      results: [],
      loading: true,
    };
  },
  mounted() {
    this.getStudentResults();
  },
  methods: {
    getStudentResults() {
      let vm = this;
      this.loading = true;
      this.$axios
        .get(`quizzes/${this.$route.params.quiz_id}/students`)
        .then((response) => {
          this.results = new Formatter().deserialize(response.data).data;
          vm.loading = false;
        });
    },
  },
};
</script>

<style scoped></style>
