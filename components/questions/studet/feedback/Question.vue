<template>
  <div>
    <div class="content pt-5 pb-5 overflow-hidden pl-3 pr-3">
      <Complete v-if="question.slug == 'complete'" :question="question" />
      <DragDrop v-else-if="question.slug == 'drag_drop'" :question="question" />
      <TrueFalse
        v-else-if="question.slug == 'true_false'"
        :question="question"
      />
      <Choice v-else-if="question.slug == 'choice'" :question="question" />
      <MultipleChoice
        v-else-if="question.slug == 'multiple_choice'"
        :question="question"
      />
      <Matching v-else-if="question.slug == 'matching'" :question="question" />
      <MultipleMatching
        v-else-if="question.slug == 'multiple_matching'"
        :question="question"
      />
    </div>
    <div
      v-if="
        question.questionData.data.question_feedback ||
        question.questionData.data.time_to_solve ||
        question.student_time_to_solve
      "
      class="question-feedback row mx-0 mt-5"
    >
      <div class="container">
        <h2 class="text-dark mb-3" style="font-size: 2rem;">
          {{ $t("question_details") }}:
        </h2>
        <div
          v-if="question.questionData.data.question_feedback"
          class="mt-4mx-0"
        >
          <div class="row mb-4">
            <h5
              class="mb-4 mb-lg-0 col-sm-12 col-lg-3 d-inline-flex align-self-center"
            >
              {{ $t("question_feedback") }}:
            </h5>
            <h5
              class="unit2 col-sm-12 col-lg-6"
              v-html="question.questionData.data.question_feedback"
            />
          </div>
        </div>
        <div
          v-if="question.questionData.data.time_to_solve"
          class="mb-4 col-12 align-items-center mx-0 px-0"
        >
          <div class="row">
            <h5
              class="mb-4 mb-lg-0 col-sm-12 col-lg-3 d-inline-flex align-self-center"
            >
              {{ $t("estimated_time_to_solve") }}:
            </h5>
            <h5 class="unit2 col-sm-12 col-lg-6">
              {{ scondsToTime(question.questionData.data.time_to_solve) }}
            </h5>
          </div>
        </div>
        <div
          v-if="question.student_time_to_solve"
          class="mb-4 col-12 align-items-center mx-0 px-0"
        >
          <div class="row">
            <h5
              class="mb-4 mb-lg-0 col-sm-12 col-lg-3 d-inline-flex align-self-center"
            >
              {{ $t("actual_time_to_solve") }}:
            </h5>
            <h5 class="unit2 col-sm-12 col-lg-6 px-0">
              {{ scondsToTime(question.student_time_to_solve) }}
            </h5>
          </div>
        </div>
        <div
          v-if="question.learning_outcome"
          class="mb-4 col-12 align-items-center mx-0 px-0"
        >
          <div class="row">
            <h5
              class="mb-4 mb-lg-0 col-sm-12 col-lg-3 d-inline-flex align-self-center"
            >
              {{ $t("learning_outcome") }}:
            </h5>
            <h5 class="unit2 col-sm-12 col-lg-6">
              {{ question.learning_outcome }}
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Complete from "./question-types/Complete.vue";
import DragDrop from "./question-types/DragDrop.vue";
import TrueFalse from "./question-types/TrueFalse.vue";
import Choice from "./question-types/Choice.vue";
import MultipleChoice from "./question-types/MultipleChoice.vue";
import Matching from "./question-types/Matching.vue";
import MultipleMatching from "./question-types/MultipleMatching.vue";

export default {
  name: "Question",

  components: {
    Complete,
    DragDrop,
    TrueFalse,
    Choice,
    MultipleChoice,
    Matching,
    MultipleMatching,
  },
  props: ["question"],

  mounted() {},

  methods: {
    scondsToTime(duration) {
      var seconds = Math.floor(duration % 60),
        minutes = Math.floor((duration / 60) % 60),
        hours = Math.floor((duration / (60 * 60)) % 24);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return hours + ":" + minutes + ":" + seconds;
    },
  },
};
</script>
