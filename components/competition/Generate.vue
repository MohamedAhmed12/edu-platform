<template>
  <div class="col-md-3 mb-2 mb-md-0 col-12">
    <a
      v-if="!loader"
      class="btn btn-block rounded-8 text-center btn-main px-1 py-3"
      @click="generate(), $emit('loa', (loader = true))"
    >
      {{ $t("start") }}
    </a>
    <div
      v-if="loader"
      class="btn rounded-8 text-center btn-main-hover px-5 py-3"
    >
      <i class="fa fa-spinner fa-spin" />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState } = createNamespacedHelpers("exams/student/generate");

export default {
  props: {
    loader: {
      type: Boolean,
    },
  },
  data() {
    return {
      load: false,
    };
  },
  computed: {
    ...mapState([
      "selectedSections",
      "selectedSubject",
      "selectedAllowedQuestionsCountForExam",
      "selectedDifficultyLevel",
    ]),
  },

  methods: {
    generate() {
      this.loader = true;
      let selectedSections = this.selectedSections.map((section) => section.id);
      const data = {
        subject_id: this.selectedSubject,
        sections: selectedSections,
        questionsCount: this.selectedAllowedQuestionsCountForExam,
        difficultyLevel: this.selectedDifficultyLevel,
      };

      this.$axios.student.competition
        .generate(data)
        .then((response) => {
          let data = this.$formatter().deserialize(response.data);

          if (!data.id && response.data.meta.message) {
            setTimeout(() => {
              this.loader = false;
            }, 1000);
            return this.$toast.error(response.data.meta.message);
          }
          setTimeout(() => {
            this.loader = false;
          }, 1000);
          let path = `/student/competitions/${data.id}/start`;
          this.$router.push(this.localePath({ path }));
        })
        .catch((err) => {
          this.loader = true;
          setTimeout(() => {
            this.loader = false;
          }, 1000);
          console.log(err);
          if (
            err.response &&
            err.response.data.errors.length &&
            err.response.data.errors[0].detail
          ) {
            this.$toast.error(err.response.data.errors[0].detail);
          }
        });
    },
  },
};
</script>
