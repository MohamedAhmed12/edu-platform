<template>
  <div>
    <Loader v-show="loading" />
    <div v-show="!loading" class="questions-area bg-white">
      <div class="row mx-0 w-100">
        <div
          v-if="question && !finished && !alreadyTaken && !quizTimePassed"
          class="col-lg-4"
        >
          <!-- ======== question info left side ========= -->
          <section class="question-info w-100 h-100 pt-2 pl-1">
            <div class="row mx-0">
              <div class="quis-block col-sm-6 col-md-12 col-6 px-2">
                <p class="title-font text-center text-md-left">
                  {{ $t("Time Remaining") }}
                </p>
              </div>
              <div class="col-sm-6 col-md-12 col-6 px-2 m-t-10">
                <p class="title-font timeOut text-center text-md-left">
                  {{ remainingTime }}
                </p>
              </div>
              <!--<ul
                v-if="homework.number_of_questions"
                class="list-unstyled questions-list quis-block col-12"
              >
                <li
                  v-for="index in parseInt(homework.number_of_questions)"
                  v-key="getRandomKey()"
                  :class="`d-inline-block p-3 rounded-8-8 mr-2 font-bold ${
                    currentQuestionIndex == index ? 'active' : ''
                  }`"
                >
                  <a disabled="disabled" href="#">{{ index }}</a>
                </li>
              </ul>-->
            </div>
          </section>
        </div>
        <div
          v-if="question && !finished && !alreadyTaken && !quizTimePassed"
          class="col-lg-8 order-2"
        >
          <section
            class="quis-details p-3 bg-white h-auto quis-details matching"
          >
            <div class="container align-self-center the-question">
              <div class="col-12">
                <h1>{{ question.question_text }}</h1>
              </div>
              <div class="col-11 ivu-col-pull-1 m-50">
                <div
                  v-for="(option, optionIndex) in question.options"
                  v-key="getRandomKey()"
                  class="form-check"
                >
                  <label class="form-check-label">
                    <input
                      :id="`option-${optionIndex}`"
                      v-model="answers[optionIndex].checked"
                      class="form-check-input"
                      type="checkbox"
                      @change="uncheckIfTrueAndFalse(answers, optionIndex)"
                    />
                    {{ $t(option.option) }}
                  </label>
                </div>
              </div>
              <div class="col-11 ivu-col-pull-1 m-50">
                <button class="btn btn-success" @click="submitAnswer">
                  {{ $t("Answer") }}
                </button>
              </div>
            </div>
          </section>
        </div>
        <div v-else-if="finished" class="col-12">
          <h1 class="text-center m-t-20">
            {{ $t("Finished") }}
          </h1>
        </div>
        <div v-else-if="alreadyTaken" class="col-12">
          <h1 class="text-center m-t-20">
            {{ $t("Already Answered") }}
          </h1>
        </div>
        <div v-else-if="quizTimePassed" class="col-12">
          <h1 class="text-center m-t-20">
            {{ $t("Time Passed") }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Formatter } from "sarala-json-api-data-formatter";
import Loader from "@/components/loader";

export default {
  name: "QuizStudentForm",
  components: {
    Loader,
  },
  props: {
    startUri: {
      default: null,
      type: String,
    },
    quizUri: {
      default: null,
      type: String,
    },
    type: {
      default: null,
      type: String,
    },
  },
  data() {
    return {
      quiz: {},
      answers: {},
      question: {},
      counter: null,
      loading: true,
      finished: false,
      remainingTime: null,
      alreadyTaken: false,
      quizTimePassed: false,
      question_to_end: null,
      question_to_start: null,
      currentQuestionIndex: 0,
    };
  },
  computed: {
    nextQuestionEndPoint() {
      return this.getEndPoint("next_question") || null;
    },
    submitAnswerEndPoint() {
      return this.getEndPoint("post_answer") || null;
    },
    finishEndPoint() {
      return this.getEndPoint(`finish_${this.type}`) || null;
    },
    continueEndPoint() {
      return this.getEndPoint(`continue_${this.type}`, "quiz") || null;
    },
  },
  mounted() {
    if (this.startUri) {
      this.start();
    }
  },
  methods: {
    //================================================
    // Main Functions
    //================================================
    start() {
      this.$axios
        .get(this.startUri)
        .then(this.handleGettingQuestion)
        .catch(this.handleIfAlreadyTakenOrJustStarted);
    },
    finish() {
      this.loading = true;
      this.$axios.get(this.finishEndPoint).then(this.handleFinishing);
    },
    getQuiz() {
      this.$axios.get(this.quizUri).then(this.handleGettingQuiz);
    },
    submitAnswer() {
      let data = this.mapAnswersToJsonApi();
      this.loading = true;

      this.$axios
        .post(this.submitAnswerEndPoint, data)
        .then(this.getNextQuestion);
    },
    getNextQuestion() {
      this.loading = true;
      if (this.finishEndPoint) {
        this.finish();
      } else if (this.nextQuestionEndPoint) {
        this.$axios
          .get(this.nextQuestionEndPoint)
          .then(this.handleGettingQuestion);
      }
    },
    //================================================
    // Secondary Functions
    //================================================
    tikTimer() {
      if (this.validateNestedProperties(this.question, "time_to_solve")) {
        let diff =
          this.question.time_to_solve -
          (((Date.now() - this.question_to_start) / 1000) | 0);

        if (diff < 1) {
          this.timeout = true;
          this.getNextQuestion();
        }

        let minutes = (diff / 60) | 0;
        let seconds = diff % 60 | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        this.remainingTime = minutes + ":" + seconds;
        let timeout = document.querySelector(".timeOut");
        if (timeout && diff <= 30) {
          if (timeout) {
            timeout.style.color = "red";
          }
        } else {
          timeout.style.color = "black";
        }
      }
    },
    startNewTimer() {
      this.clearExistingTimer();
      this.question_to_start = new Date();
      this.counter = setInterval(this.tikTimer, 1000);
      this.currentQuestionIndex++;
    },
    handleFinishing() {
      this.clearExistingTimer();
      this.loading = false;
      this.finished = true;
    },
    clearExistingTimer() {
      clearInterval(this.counter);
      let timeout = document.querySelector(".timeOut");
      timeout.style.color = "black";
    },
    mapAnswersToJsonApi() {
      let chosenAnswers = this.answers
        .filter((answer) => answer.checked === true)
        .map((answer) => {
          return { id: answer.id, type: "answer" };
        });
      let included = this.answers
        .filter((answer) => answer.checked === true)
        .map((answer) => {
          return {
            id: answer.id,
            type: "answer",
            attributes: { answer_id: answer.id },
          };
        });

      return {
        data: [
          {
            type: "question",
            id: this.question.id,
            relationships: {
              answers: {
                data: chosenAnswers,
              },
            },
          },
        ],
        included,
      };
    },
    markAnswerIfExist(answer) {
      let currentAnswer = this.answers.find(
        (ans) => ans.id === answer.option_id
      );
      currentAnswer.checked = true;
    },
    handleGettingQuiz(response) {
      let formatter = new Formatter();
      this.quiz = formatter.deserialize(response.data);
    },
    handleGettingQuestion(response) {
      let formatter = new Formatter();
      let question = formatter.deserialize(response.data).data[0];
      if (this.validateNestedProperties(question, "options")) {
        this.question = question;
        this.answers = question.options;
        this.startNewTimer();
        this.loading = false;
      }
    },
    handleIfAlreadyTakenOrJustStarted(error) {
      const QUIZ_TIME_PASSED = "quiz_time_passed";
      const QUIZ_HAS_BEEN_TAKEN = "this_quiz_has_been_already_taken";
      const QUIZ_HAS_BEEN_STARTED_ALREADY = "quiz_has_been_started_already";
      if (this.validateNestedProperties(error, "response", "data", "errors")) {
        if (
          error.response.status === 422 &&
          error.response.data.errors[0].title === QUIZ_HAS_BEEN_TAKEN
        ) {
          this.loading = false;
          this.alreadyTaken = true;
        } else if (
          error.response.status === 422 &&
          error.response.data.errors[0].title === QUIZ_TIME_PASSED
        ) {
          this.loading = false;
          this.quizTimePassed = true;
        } else if (
          error.response.status === 422 &&
          error.response.data.errors[0].title === QUIZ_HAS_BEEN_STARTED_ALREADY
        ) {
          console.log("already started");
          this.$axios
            .get(this.quizUri)
            .then(this.handleGettingLatestQuestionTheUserStoppedAt);
        } else {
          console.log(error);
        }
      }
    },
    getEndPoint(type, property = "question") {
      if (this.validateNestedProperties(this[property], "actions", "data")) {
        let links = this[property].actions.data.filter((a) => a.key === type);
        if (links.length) return links[0].endpoint_url;
        else return null;
      }
    },
    handleGettingQuestionWithAnswers(response) {
      let formatter = new Formatter();
      let question = formatter.deserialize(response.data).data.pop();
      if (this.validateNestedProperties(question, "options")) {
        this.question = question;
        this.answers = question.options;

        if (question.answers) {
          for (let answer of question.answers) {
            this.markAnswerIfExist(answer);
          }
        }

        this.startNewTimer();
        this.loading = false;
      }
    },
    uncheckIfTrueAndFalse(answers, optionIndex) {
      if (
        this.validateNestedProperties(this.question, "question_type") &&
        this.question.question_type === "true_false"
      ) {
        let toBeReversed = answers
          .filter((answer, index) => index !== optionIndex)
          .pop();
        toBeReversed.checked = false;
      }
    },
    handleGettingLatestQuestionTheUserStoppedAt(response) {
      let formatter = new Formatter();
      this.quiz = formatter.deserialize(response.data);
      this.$axios
        .get(this.continueEndPoint)
        .then(this.handleGettingQuestionWithAnswers);
    },
    //================================================
    // Helper Functions for this component
    //================================================
    getRandomKey() {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for (let i = 0; i < charactersLength; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    validateNestedProperties(obj, level, ...rest) {
      if (obj === undefined) return false;
      // eslint-disable-next-line no-prototype-builtins
      if (rest.length === 0 && obj.hasOwnProperty(level)) return true;
      return this.validateNestedProperties(obj[level], ...rest);
    },
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.counter);
    if (this.finished) {
      next();
    }
  },
};
</script>

<style scoped></style>
