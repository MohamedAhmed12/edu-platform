<template>
  <div>
    <p class="title-font" v-html="questionData.description" />
    <div class="row">
      <div
        v-for="option in questionOptions"
        v-show="checkIfUsed(option.id)"
        :id="`option-${option.id}`"
        :key="option.id"
        :ref="`option-${option.id}`"
        class="col m-2"
        draggable="true"
        @dragstart="drag"
      >
        <div class="drag">
          <p class="btn- btn-sm text-dark" v-html="option.option" />
        </div>
      </div>
      <div class="col-12 mt-4">
        <!-- <p class="title-font text-dark mt-4 mb-1">Group 2</p> -->
        <div
          v-for="question in questionData.questions"
          :key="question.id"
          class="form-group row mx-0"
        >
          <label class="col-12 col-form-label bold-label">
            <div class="row mx-0">
              <svg
                class="mt-2 mr-2"
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
                :id="`drop-${question.id}`"
                @dragover.prevent
                @drop.prevent="drop"
                v-html="formattedQuestion(question)"
              />
            </div>
            <img class="mb-3 drag-drop-img" :src="question.media.url" />
          </label>
          <!-- answer feedback -->
          <div
            v-if="
              answersCorrection.length !== 0 &&
              getCorrection(question.id).length !== 0
            "
            class="col-3"
          >
            <div class="drop">
              <div class="row">
                <div class="col-1 p-0">
                  <span>(</span>
                </div>
                <div class="p-0 col">
                  <div
                    class="drag correct-answer"
                    v-html="getCorrection(question.id)"
                  />
                </div>
                <div class="col-1 p-0">
                  <span>)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";

export default {
  name: "DragDrop",
  components: {
    draggable,
  },
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
      questionOptions: [],
      answers: [],
      optionsData: {},
      answersCorrection: [],
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
    questionOptionsData: {
      get() {
        if (
          this.questionNumber &&
          this.$store.getters["exams/student/questionOptionsData"][
            this.questionNumber
          ]
        ) {
          return this.$store.getters["exams/student/questionOptionsData"][
            this.questionNumber
          ];
        }
        return { options: this.questionOptions, html: {} };
      },
      set(optionsData) {
        let questionOptionsData = this.$store.getters[
          "exams/student/questionOptionsData"
        ];

        if (!questionOptionsData[this.questionNumber]) {
          questionOptionsData[this.questionNumber] = {};
        }
        questionOptionsData[this.questionNumber].html = optionsData;
        questionOptionsData[this.questionNumber].options = this.questionOptions;

        this.$store.commit(
          "exams/student/SET_QUESTION_OPTIONS_DATA",
          questionOptionsData
        );
      },
    },
  },
  watch: {
    question(val) {
      this.answersCorrection = [];
      this.answers = [];
      this.questionOptions = this.question.questionData.data.options;
      if (
        this.questionAnswer &&
        this.questionAnswer.question_id == this.question.id
      ) {
        this.answers = this.questionAnswer.answer;
        this.questionOptions = this.questionOptionsData.options;
        this.optionsData = this.questionOptionsData.html;
        this.$forceUpdate();
      }
    },
    answers(val) {
      this.setAnswer();
    },
    questionData(val) {
      this.optionsData = {};
      // if question didn't answered yet or answered correctly
      if (val.is_correct_answer !== false) {
        return;
      }

      let wrongAnswersId = this.questionData.student_answer.map((question) =>
        !question.is_correct_answer ? question.question_id : ""
      );

      this.answersCorrection = this.questionData.questions.map((q) => {
        if (wrongAnswersId.includes(q.id)) {
          return {
            id: q.id,
            answers: this.questionData.options.filter(
              (option) => option.id === q.answers
            )[0],
          };
        }

        return {};
      });
    },
  },
  mounted() {
    this.optionsData = {};
    this.answersCorrection = [];
    this.answers = [];
    this.questionOptions = this.question.questionData.data.options;
    let questionAnswer = this.questionNumber
      ? this.$store.getters["exams/student/answers"][this.questionNumber]
      : {};
    let questionOptionsData = { options: this.questionOptions, html: {} };
    if (
      this.questionNumber &&
      this.$store.getters["exams/student/questionOptionsData"][
        this.questionNumber
      ]
    ) {
      questionOptionsData = this.$store.getters[
        "exams/student/questionOptionsData"
      ][this.questionNumber];
    }
    if (questionAnswer && questionAnswer.question_id == this.question.id) {
      this.answers = questionAnswer.answer;
      this.questionOptions = this.questionOptionsData.options;
      this.optionsData = this.questionOptionsData.html;
      this.$forceUpdate();
    }
  },
  methods: {
    setAnswer() {
      let answers = this.answers.map((answer, index) => {
        return {
          type: "answer",
          id: `new_answer_${index + 1}`,
          attributes: {
            single_question_id: answer.single_question_id,
            answer_id: answer.id,
          },
        };
      });
      this.questionAnswer = {
        answer: this.answers,
        question_id: this.question.id,
      };
      this.$emit("setAnswer", answers);
    },
    drag(e) {
      e.dataTransfer.setData("text", e.target.id);
    },
    drop(e) {
      let data = e.dataTransfer.getData("text");
      let single_question_id = e.target.id.split("-")[1];
      if (!single_question_id) {
        return;
      }
      this.answers = this.answers.filter(
        (ans) => ans.single_question_id != single_question_id
      );
      let node = this.$refs[data][0].childNodes[0];
      this.optionsData[e.target.id] =
        node.outerHTML || new XMLSerializer().serializeToString(node);
      this.questionOptionsData = this.optionsData;
      this.answers.push({
        single_question_id,
        id: data.split("-")[1],
      });
      this.$forceUpdate();
    },
    checkIfUsed(option_id) {
      return (
        this.answers.filter((ans) => {
          return ans.id == option_id;
        }).length == 0
      );
    },
    formattedQuestion(question) {
      return question.question.replace(
        "*__*",
        `(${this.optionsData["drop-" + question.id] || " "})`
      );
    },
    getCorrection(question_id) {
      let correctAnswer = this.answersCorrection.filter((q) => {
        if (!$.isEmptyObject(q) && q.id === question_id) {
          return q;
        }
      });

      return correctAnswer.length !== 0 ? correctAnswer[0].answers.option : "";
    },
  },
};
</script>
