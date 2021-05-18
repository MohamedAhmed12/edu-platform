<template>
  <div>
    <p class="title-font" />
    <form action="#" class="form">
      <div class="row">
        <div class="col-12">
          <div class="form-group row">
            <label class="col-sm-8 col-form-label bold-label" for="compelete1">
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
              <span class="question" v-html="questionData.question" />
            </label>
            <!-- {{questionData}} -->
            <div class="col-sm-4">
              <div
                class="pt-3 pb-3 answer rounded-8 bg-white d-flex justify-content-center"
                v-html="questionData.answer"
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
  name: "Complete",
  props: {
    question: {
      type: Object,
      default: () => ({}),
    },
    questionNumber: {
      type: Number,
      default: () => 1,
    },
  },
  data() {
    return {
      answer: "sds",
    };
  },
  computed: {
    questionData() {
      return this.question.questionData.data;
    },
    // questionAnswer: {
    //   get() {
    //     return this.questionNumber
    //       ? this.$store.getters["exams/student/answers"][this.questionNumber]
    //       : {};
    //   },
    //   set(answer) {
    //     let answers = this.$store.getters["exams/student/answers"];
    //     answers[this.questionNumber] = answer;
    //     this.$store.commit("exams/student/SET_ANSWERS", answers);
    //   }
    // }
  },
  mounted() {
    this.answer = null;
    $(".answer p").addClass("m-0");
    $(".question p").addClass("m-0 d-inline");
    // return console.log(
    //   this.$store.getters["exams/student/answers"],
    //   "thi",
    //   this.questionNumber
    // );

    // let questionAnswer = this.$store.getters["exams/student/answers"][1];
    // console.log(this.$store.getters["exams/student/answers"]);

    // if (questionAnswer && questionAnswer.question_id == this.question.id) {
    //   this.answer = questionAnswer.answer;
    // }
  },
  // watch: {
  //   answer(val) {
  //     this.setAnswer();
  //   },
  //   question(val) {
  //     this.answer = null;
  //     if (
  //       this.questionAnswer &&
  //       this.questionAnswer.question_id == this.question.id
  //     ) {
  //       this.answer = this.questionAnswer.answer;
  //     }
  //   }
  // },
  // methods: {
  //   setAnswer() {
  //     let answers = [
  //       {
  //         type: "answer",
  //         id: "new_1",
  //         attributes: {
  //           answer_id: null,
  //           answer_text: this.answer
  //         }
  //       }
  //     ];
  //     this.questionAnswer = {
  //       answer: this.answer,
  //       question_id: this.question.id
  //     };
  //     this.$emit("setAnswer", answers);
  //   }
  // }
};
</script>
