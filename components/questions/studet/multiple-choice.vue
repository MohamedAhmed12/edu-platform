<template>
  <div>
    <p class="title-font" v-html="questionData.question" />
    <img
      class="img-fluid mb-3 multiple-choice-img"
      :src="questionData.media.url"
    />
    <form action="#" class="form">
      <div class="row">
        <div
          v-for="option in questionData.options"
          :key="option.id"
          class="col-xl-5 mx-xl-auto m-1"
          :class="`radio-bg rounded-8 ${option.wrong_answer_style || ''} ${
            answers.includes(option.id) || option.is_correct_answer
              ? 'active-radio'
              : ''
          }`"
        >
          <label class="checkbox py-4" style="overflow-y: hidden;">
            <input
              v-model="answers"
              checked
              class="d-none"
              type="checkbox"
              :value="option.id"
            />
            <i class="fas fa-check" />
            <span
              class="mx-auto choise-content"
              style=""
              v-html="option.option"
            />
          </label>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "MultipleChoice",
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
      answers: [],
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
    answers(val) {
      this.setAnswer();
    },
    question(val) {
      this.answers = [];
      if (
        this.questionAnswer &&
        this.questionAnswer.question_id == this.question.id
      ) {
        this.answers = this.questionAnswer.answer;
      }
    },
    questionData(val) {
      // if question didn't answered yet or answered correctly
      if (val.is_correct_answer !== false) {
        return;
      }

      this.questionData.options.forEach((option) => {
        if (this.answers.includes(option.id) && !option.is_correct_answer) {
          return (option.wrong_answer_style = "wrong-answer");
        }
      });
    },
  },
  mounted() {
    this.answers = [];
    let questionAnswer = this.$store.getters["exams/student/answers"][
      this.questionNumber
    ];

    if (questionAnswer && questionAnswer.question_id == this.question.id) {
      this.answers = questionAnswer.answer;
    }
  },
  methods: {
    setAnswer() {
      let answers = this.answers.map((answer, index) => {
        return {
          type: "answer",
          id: `new_${index + 1}`,
          attributes: {
            answer_id: answer,
          },
        };
      });
      this.questionAnswer = {
        answer: this.answers,
        question_id: this.question.id,
      };
      this.$emit("setAnswer", answers);
    },
  },
};
</script>
