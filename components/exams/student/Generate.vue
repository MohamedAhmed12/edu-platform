<template>
  <div class="row">
    <div class="actions col-lg-10 col-md-11 mx-auto col-12 px-1 mt-3">
      <div class="row">
        <div class="col-md-3 mb-2 mb-md-0 col-12">
          <a
            class="btn btn-block rounded-8 text-center btn-main px-1 py-3"
            :class="{ disabled: loader }"
            :disable="disable"
            @click="generate()"
          >
            <i v-if="loader" class="fa fa-spinner fa-spin" />
            {{ $t("start") }}
          </a>
        </div>

        <div class="col-md-3 mb-2 mb-md-0 pl-md-0 col-12 question-numbers">
          <select
            v-model="questions"
            class="form-control h-100 border-0 rounded-8"
          >
            <option disabled value="0">
              No. Qs
            </option>
            <option
              v-for="(allowedQuestionCount,
              index) in allowedQuestionsCountForExam"
              :key="index"
              :value="allowedQuestionCount.id"
            >
              {{ allowedQuestionCount.attributes.name }}
            </option>
          </select>
        </div>

        <div
          v-for="(difficultyLevel, index) in difficultyLevels"
          :key="index"
          class="col-md-2 mb-2 mb-md-0 pl-md-0 col-4"
        >
          <a
            :class="`btn btn-block rounded-8 text-center btn-light-blue-bg px-1 py-3 ${
              selectedDifficultyLevel == difficultyLevel.id ? 'selected' : ''
            }`"
            @click="selectedDifficultyLevel = difficultyLevel.id"
            >{{ difficultyLevel.attributes.name }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Generate",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      subject: {},
      sections: [],
      subSections: [],
      selectedSections: [],
      difficultyLevels: [],
      allowedQuestionsCountForExam: [],
      selectedDifficultyLevel: 0,
      selectedAllowedQuestionsCountForExam: 0,
      isLoading: true,
      questions: 0,
      isCheckAll: false,
      loader: false,
    };
  },
  computed: {
    checkAll: {
      get: function () {
        return this.sections
          ? this.selectedSections.length == this.sections.length
          : false;
      },
      set: function (value) {
        var checked = [];
        if (value) {
          this.sections.forEach(function (lang) {
            checked.push(lang.id);
          });
        }
        this.selectedSections = checked;
      },
    },
    subjects() {
      return this.data;
    },
    disable() {
      return (
        this.selectedSections.length == 0 ||
        this.selectedDifficultyLevel == 0 ||
        this.questions == 0
      );
    },
  },
  mounted() {
    this.loadSections(this.subjects[0]);
    this.loadDifficultyLevels();
    this.loadAllowedQuestionsCountForExam();
  },

  methods: {
    loadSubSections(section) {
      this.sections = [];
      this.selectedSections = [];
      this.$axios
        .get(`student/subjects/section/${section.id}/sections`)
        .then((response) => {
          let section = this.$formatter().deserialize(response.data);
          if (section.sections) {
            this.subSections = section.sections.data;
          }
          this.isLoading = false;
        })
        .catch((err) => {
          this.$toast.error("Something went wrong, try again later");
          console.log(err);
        });
    },
    loadDifficultyLevels() {
      this.$axios.get("look-up?include=difficultyLevel").then((response) => {
        let data = this.$formatter().deserialize(response.data);
        this.difficultyLevels = data.included;
        this.selectedDifficultyLevel = this.difficultyLevels.length
          ? this.difficultyLevels[0].id
          : 0;
        this.isLoading = false;
      });
    },
    loadAllowedQuestionsCountForExam() {
      this.$axios
        .get("look-up?include=allowedQuestionsCountForExam")
        .then((response) => {
          let data = this.$formatter().deserialize(response.data);
          this.allowedQuestionsCountForExam = data.included;
          this.isLoading = false;
        });
    },
    generate() {
      if (this.disable) {
        let message = `it's required to Select section/s & the difficulty level & No. of questions`;
        this.$toast.error(message);
        return;
      }

      this.removeSelectedSectionsParents();

      let body = {
        type: "exam",
        id: "null",
        attributes: {
          subject_id: parseInt(this.subject.id),
          subject_format_subject_ids: this.selectedSections,
          number_of_questions: parseInt(
            this.selectedAllowedQuestionsCountForExam
          ),
          difficulty_level: parseInt(this.selectedDifficultyLevel),
        },
      };

      this.$axios
        .post("student/exams/generate-exam", { data: body })
        .then((response) => {
          this.loader = true;
          let data = this.$formatter().deserialize(response.data);
          if (data.data && !data.data.length && data.meta.message) {
            this.$toast.error(data.meta.message);
            return;
          }
          let path = `/student/exams/${data.id}`;
          this.$router.push(this.localePath({ path }));
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loader = true;
          if (
            err.response &&
            err.response.data.errors.length &&
            err.response.data.errors[0].detail
          ) {
            this.$toast.error(err.response.data.errors[0].detail);
          }
        })
        .finally((err) => {
          this.loader = false;
        });
    },
  },
};
</script>
