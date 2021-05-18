<template>
  <div>
    <h2 class="text-center" v-html="questionData.description" />
    <h2 class="text-center" v-html="questionData.text" />

    <form action="#" class="form m-0">
      <div class="row mt-4">
        <div class="col-6 col-sm-6">
          <div
            class="radio-bg-flag py-4 px-4 rounded-8"
            :class="{
              'active-radio': questionData.is_true,
              'wrong-answer':
                !questionData.is_correct_answer && !questionData.is_true,
            }"
          >
            <div class="custom-control custom-radio custom-control-inline">
              <input
                class="custom-control-input"
                disabled
                name="true_false_question"
                type="radio"
                value="true"
              />
              <label class="custom-control-label font-bold" for="option1">{{
                $t("true")
              }}</label>
            </div>
          </div>
        </div>

        <div class="col-6 col-sm-6">
          <div
            class="radio-bg-flag py-4 px-4 rounded-8"
            :class="{
              'active-radio': !questionData.is_true,
              'wrong-answer':
                !questionData.is_correct_answer && questionData.is_true,
            }"
          >
            <div class="custom-control custom-radio custom-control-inline">
              <input
                id="option2"
                class="custom-control-input"
                disabled
                name="true_false_question"
                type="radio"
                value="false"
              />
              <label class="custom-control-label font-bold" for="option2">{{
                $t("false")
              }}</label>
            </div>
          </div>
        </div>
      </div>
    </form>

    <div v-if="questionData.options" class="col-sm-12 pl-0 pr-0">
      <div class="row">
        <h2 class="title-font col-sm-12 mb-3 mt-5">
          Correct Answer
        </h2>
        <div
          v-for="option in questionData.options"
          :key="option.id"
          class="col-6 col-sm-6 mb-4"
        >
          <div
            class="radio-bg-flag py-4 px-4 rounded-8"
            :class="{
              'active-radio': option.is_correct,
              'wrong-answer': isStudentWrongAnswer(option),
            }"
          >
            <div class="custom-control custom-radio custom-control-inline">
              <input
                :id="`option_${option.id}`"
                class="custom-control-input"
                disabled
                :name="`customRadioInline${option.id}`"
                type="radio"
                :value="option.id"
              />
              <label
                class="custom-control-label font-bold"
                :for="`option_${option.id}`"
                v-html="option.option"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TrueFalseQuestion",
  props: ["question"],

  computed: {
    questionData: function () {
      return this.question.questionData.data;
    },
  },

  methods: {
    isStudentWrongAnswer(option) {
      if (option.is_correct) return false;

      if (Array.isArray(this.questionData.student_answer)) {
        return this.questionData.student_answer.every(
          (answer) => answer.option_id !== option.id
        );
      }

      if (this.questionData.student_answer) {
        return this.questionData.student_answer.option_id === option.id;
      }

      return false;
    },
  },
};
</script>
