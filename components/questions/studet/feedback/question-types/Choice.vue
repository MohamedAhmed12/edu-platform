<template>
  <div>
    <h2 class="text-center" v-html="questionData.description" />
    <p class="text-center" v-html="questionData.question" />

    <form action="#" class="form m-0">
      <div class="row mt-4">
        <div
          v-for="option in questionData.options"
          :key="option.id"
          class="col-6 col-sm-6 mb-4"
        >
          <div
            class="radio-bg-flag py-4 px-4 rounded-8"
            :class="{
              'active-radio': option.is_correct_answer,
              'wrong-answer': isStudentWrongAnswer(option),
            }"
          >
            <div class="custom-control custom-radio custom-control-inline">
              <input
                :id="`option${option.id}`"
                class="custom-control-input"
                name="choices_question"
                :value="option.id"
              />
              <label
                class="custom-control-label font-bold"
                :for="`option${option.id}`"
                v-html="option.option"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ChoiceQuestion",
  props: ["question"],

  computed: {
    questionData: function () {
      return this.question.questionData.data;
    },

    isStudentWrongAnswer(option) {
      if (option.is_correct_answer) return false;

      if (Array.isArray(this.questionData.student_answer)) {
        return this.questionData.student_answer.every(
          (answer) => answer.answer_id !== option.id
        );
      }

      if (this.questionData.student_answer) {
        return this.questionData.student_answer.answer_id === option.id;
      }

      return false;
    },
  },
};
</script>
