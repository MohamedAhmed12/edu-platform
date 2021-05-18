<template>
  <div>
    <p class="title-font" v-html="questionData.question" />

    <form action="#" class="form">
      <div class="row">
        <div
          v-for="option in questionData.options"
          :key="option.id"
          class="py-4 col-lg-5 pl-4 mb-4 mx-auto"
          :class="` radio-bg rounded-8 ${option.wrong_answer_style || ''} ${
            answer == option.id || option.is_correct_answer
              ? 'active-radio'
              : ''
          }`"
        >
          <div class="custom-control custom-radio custom-control-inline">
            <input
              :id="`option${option.id}`"
              v-model="answer"
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
    </form>
  </div>
</template>
<script>
export default {
  name: "SingleChoice",
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
    question(val) {
      this.answer = null;
      if (
        this.questionAnswer &&
        this.questionAnswer.question_id == this.question.id
      ) {
        this.answer = this.questionAnswer.answer;
      }
    },
    questionData(val) {
      this.questionData.options.forEach((option) => {
        if (this.answer == option.id && !option.is_correct_answer) {
          return (option.wrong_answer_style = "wrong-answer");
        }
      });
    },
  },
  mounted() {
    this.answer = null;
    let questionAnswer = this.$store.getters["exams/student/answers"][
      this.questionNumber
    ];
    if (questionAnswer && questionAnswer.question_id == this.question.id) {
      this.answer = questionAnswer.answer;
    }
  },
  methods: {
    setAnswer() {
      let answers = [
        {
          type: "answer",
          id: "new_1",
          attributes: {
            answer_id: this.answer,
          },
        },
      ];
      this.questionAnswer = {
        answer: this.answer,
        question_id: this.question.id,
      };
      this.$emit("setAnswer", answers);
    },
  },
};
</script>
