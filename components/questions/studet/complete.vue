<template>
  <div>
    <p class="title-font" />
    <form action="#" class="form">
      <div class="row">
        <div class="col-12">
          <div class="form-group row">
            <label class="col-12 col-form-label bold-label" for="compelete1">
              <svg
                height="8"
                viewBox="0 0 13 13"
                width="8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  id="Ellipse_295"
                  cx="6.5"
                  cy="6.5"
                  data-name="Ellipse 295"
                  fill="#2e3a73"
                  r="6.5"
                />
              </svg>
              <span
                class="d-inline"
                v-html="formattedQuestion(questionData.question)"
              />
            </label>
            <div class="col-sm-4 col-md-4 col-12" />
          </div>
          <!-- feedback correct answer -->
          <div
            v-if="correctAnswer"
            class="row p-3 mt-5 d-flex align-items-center"
          >
            <h5 class="font-bold">{{ $t("the_correct_answer") }} :</h5>
            <div
              class="ml-3 pt-3 pb-3 form-control rounded-8 col-md-4 correct-answer"
              v-html="questionData.answer"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "Complete",
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
      correctAnswer: null,
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
      this.correctAnswer = null;
      this.answer = null;
      if (
        this.questionAnswer &&
        this.questionAnswer.question_id == this.question.id
      ) {
        this.answer = this.questionAnswer.answer;
      }
    },
    questionData(val) {
      this.checkIfAnswered(val);
    },
  },
  updated() {
    this.setAnswerField();
    this.styleRenderedQuestion();
  },
  mounted() {
    this.correctAnswer = null;
    this.answer = null;
    let questionAnswer = this.$store.getters["exams/student/answers"][
      this.questionNumber
    ];
    if (questionAnswer && questionAnswer.question_id == this.question.id) {
      this.answer = questionAnswer.answer;
    }
    this.setAnswerField();
    this.styleRenderedQuestion();
    if (this.question.is_answered) {
      this.checkIfAnswered(this.questionData);
    }
  },
  methods: {
    setAnswer() {
      let answers = [
        {
          type: "answer",
          id: "new_1",
          attributes: {
            answer_id: null,
            answer_text: this.answer,
          },
        },
      ];
      this.questionAnswer = {
        answer: this.answer,
        question_id: this.question.id,
      };
      this.$emit("setAnswer", answers);
    },
    setAnswerField(e) {
      // set answer field vallue in component's this.answer
      if (process.browser) {
        $("#compelete1").keyup((e) => {
          this.answer = e.target.value;
        });
      }
    },
    formattedQuestion(question) {
      return question.replace(
        "*__*",
        `<input
          type="text"
          id="compelete1"
          class="ml-2 mr-2 pt-4 pb-4 form-control rounded-8 w-auto d-inline-flex"
        />`
      );
    },
    styleRenderedQuestion() {
      $("#compelete1").parents("h4").addClass("d-inline");
    },
    checkIfAnswered(val) {
      // if question didn't answered yet or answered correctly
      if (val.is_correct_answer == true) {
        $("#compelete1").attr(
          "class",
          "ml-2 mr-2 pt-4 pb-4 form-control rounded-8 w-auto d-inline-flex correct-answer"
        );

        return;
      }

      $("#compelete1")
        .val(val.student_answer ? val.student_answer.answer_text : "")
        .attr("class", "ml-3 pt-3 pb-3 rounded-8 col-md-4 wrong-answer");
      this.correctAnswer = val.answer;
    },
  },
};
</script>
