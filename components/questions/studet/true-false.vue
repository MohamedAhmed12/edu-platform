<template>
  <div>
    <p class="title-font col-12" v-html="questionData.text" />
    <img
      class="img-fluid mb-3 col-12 true-false-img"
      :src="questionData.media.url"
      style="width: 100%;"
    />
    <form action="#" class="form m-0 col-12">
      <div class="row">
        <div class="col-lg-6 mb-3 mb-lg-0">
          <div
            class="pl-4 pt-4 pb-4 radio-bg-flag rounded-8"
            :class="[
              {
                'active-radio': answer == 'true',
              },
              setTrueFalseCorrection(true),
            ]"
            @click="answer = 'true'"
          >
            <div
              class="custom-control custom-radio custom-control-inline font-bold"
            >
              <input
                id="option1"
                v-model="answer"
                class="custom-control-input"
                name="customRadioInline1"
                type="radio"
                value="true"
              />
              <label class="custom-control-label" for="option1">{{
                this.$t("true")
              }}</label>
            </div>
          </div>
        </div>
        <div class="col-lg-6 mb-3 mb-lg-0">
          <div
            class="pl-4 pt-4 pb-4 radio-bg-flag rounded-8"
            :class="[
              {
                'active-radio': answer == 'false',
              },
              setTrueFalseCorrection(false),
            ]"
            @click="answer = 'false'"
          >
            <div
              class="custom-control custom-radio custom-control-inline font-bold"
            >
              <input
                id="option2"
                v-model="answer"
                class="custom-control-input"
                name="customRadioInline1"
                type="radio"
                value="false"
              />
              <label class="custom-control-label" for="option2">{{
                this.$t("false")
              }}</label>
            </div>
          </div>
        </div>
      </div>
    </form>
    <!-- if true-false-with-correction type -->
    <div
      v-if="typeof questionData.options !== 'undefined'"
      class="question-options col-12"
    >
      <h1 class="font-bold my-3 pl-1 pt-2">{{ this.$t("options") }}:</h1>
      <div class="row">
        <div
          v-for="option in questionData.options"
          :key="option.id"
          class="col-lg-6 mb-3"
        >
          <div
            class="pl-4 pt-4 pb-4 radio-bg rounded-8"
            :class="[
              {
                'active-radio': correct == option.id,
                'correct-answer': optionsCorrectionId === option.id,
              },
              setOptionCorrection(option.id),
            ]"
          >
            <div class="custom-control custom-radio custom-control-inline">
              <input
                :id="`option${option.id}`"
                v-model="correct"
                class="custom-control-input"
                name="option"
                type="radio"
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
    </div>
  </div>
</template>
<script>
export default {
  name: "TrueFalse",
  props: {
    question: {
      type: Object,
      default: () => ({}),
    },
    questionNumber: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      answer: null,
      correct: null,
      optionsCorrectionId: "",
    };
  },
  computed: {
    questionData() {
      return this.$store.getters["exams/student/questionData"];
    },
    questionAnswer: {
      get() {
        return this.questionNumber
          ? this.$store.getters["exams/student/answers"][this.questionNumber]
          : {};
      },
      set(answer) {
        let answers = this.$store.getters["exams/student/answers"];
        answers[this.questionNumber] = answer;
        this.$store.commit("exams/student/SET_ANSWERS", answers);
      },
    },
  },
  watch: {
    answer(val) {
      this.setAnswer();
    },
    correct(val) {
      this.setAnswer();
    },
    question(val) {
      this.answer = null;
      this.correct = null;
      if (
        this.questionAnswer &&
        this.questionAnswer.question_id == this.question.id
      ) {
        this.answer = this.questionAnswer.answer;
        this.correct = this.questionAnswer.correct;
      }
    },
  },
  mounted() {
    this.correct = null;
    let questionAnswer = this.$store.getters["exams/student/answers"][
      this.questionNumber
    ];
    if (questionAnswer && questionAnswer.question_id == this.question.id) {
      this.answer = questionAnswer.answer;
      this.correct = questionAnswer.correct;
    }
  },
  methods: {
    setAnswer() {
      let answers = [
        {
          type: "answer",
          id: "new_1",
          attributes: {
            answer_id: this.correct,
            answer_text: eval(this.answer),
          },
        },
      ];
      this.questionAnswer = {
        answer: this.answer,
        correct: this.correct,
        question_id: this.question.id,
      };
      this.$emit("setAnswer", answers);
    },
    setTrueFalseCorrection(inputVal) {
      if (this.checkIfAnsweredWrong() === "exit") {
        return;
      }

      // if student answer is correct [true-false part of the question]
      if (
        this.questionData.student_answer.answer_text ==
        this.questionData.is_true
      ) {
        return "";
      }

      return this.questionData.is_true == inputVal
        ? "correct-answer"
        : "wrong-answer";
    },
    setOptionCorrection(optionId) {
      if (this.checkIfAnsweredWrong() === "exit") {
        return;
      }

      // if this option isn't the student answer
      if (this.questionData.student_answer.option_id !== optionId) {
        return "";
      }

      // if student answer is wrong
      if (
        !this.questionData.options.find((op) => op.id == optionId).is_correct
      ) {
        // set the right answer
        this.optionsCorrection = this.questionData.options.find(
          (op) => op.is_correct == true
        );

        this.optionsCorrectionId =
          typeof this.optionsCorrection !== "undefined"
            ? this.optionsCorrection.id
            : "";

        return "wrong-answer";
      }

      return "correct-asnwer";
    },
    checkIfAnsweredWrong() {
      // if question hasn't been answered yet
      if (typeof this.questionData.is_answered === "undefined") {
        return "exit";
      }
      // if answered correctlly
      if (this.questionData.is_correct_answer) {
        return "exit";
      }
    },
  },
};
</script>

<style>
img {
  max-height: 300px;
}
</style>
