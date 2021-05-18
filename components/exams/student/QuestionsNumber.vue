<template>
  <div class="col-md-6 mb-2 mb-md-0 pl-md-0 col-12 question-numbers">
    <select v-model="count" class="form-control h-100 rounded-8">
      <option disabled value="0">
        {{ $t("questions_number") }}
      </option>
      <option
        v-for="(allowedQuestionCount, index) in allowedQuestionsCountForExam"
        :key="index"
        :value="allowedQuestionCount.id"
        @click="SET_SELECTED_QUESTION_COUNT(allowedQuestionCount.id)"
      >
        {{ allowedQuestionCount.attributes.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapMutations } = createNamespacedHelpers(
  "exams/student/generate"
);
export default {
  computed: {
    ...mapState([
      "allowedQuestionsCountForExam",
      "selectedAllowedQuestionsCountForExam",
    ]),
    count: {
      get() {
        return this.selectedAllowedQuestionsCountForExam;
      },
      set(val) {
        this.SET_SELECTED_QUESTION_COUNT(val);
      },
    },
  },
  methods: {
    ...mapMutations(["SET_SELECTED_QUESTION_COUNT"]),
  },
};
</script>
