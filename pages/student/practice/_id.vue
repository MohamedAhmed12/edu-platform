<template>
  <div class="questions-area d-block bg-white">
    <div class="row mx-0" style="height: fit-content;">
      <!-- ======== question info ,left side ========= -->
      <section class="question-info w-100 col-lg-4 pt-2 pl-1">
        <div class="row mx-0">
          <div class="quis-block">
            <h3 class="title-font" v-html="questionData.description" />
          </div>
          <ul
            v-if="exam.questions_numbers"
            class="list-unstyled questions-list quis-block col-12"
          >
            <li
              v-for="q in exam.questions_numbers"
              :key="q"
              :class="`d-inline-block p-3 rounded-8-8 m-2 font-bold ${
                questionNumber == q ? 'active' : ''
              }`"
            >
              <a href="#">{{ q }}</a>
            </li>
          </ul>
        </div>
      </section>
      <!-- ======== question area right side ========= -->
      <section
        class="quis-details bg-white h-auto col-lg-8 quis-details py-1 matching"
      >
        <div class="container align-self-center the-question">
          <div
            v-if="finishExam.endpoint_url"
            class="d-flex align-items-end flex-column mt-2 mb-2"
          >
            <a
              v-if="!loader"
              class="btn btn-danger py-3 rounded-8 text-center"
              href="#"
              :style="`background-color: ${finishExam.bg_color}`"
              @click="endExam"
            >
              {{ finishExam.label }}
            </a>
            <div
              v-if="loader"
              class="btn rounded-8 text-center btn-main-hover px-5 py-3"
            >
              <i class="fa fa-spinner fa-spin" />
            </div>
          </div>
          <component
            :is="questionType"
            v-if="question.question_type"
            :question="question"
            :question-number="questionNumber"
            @setAnswer="setAnswer"
          />
          <!-- question's feedback  -->
          <div v-if="question_feedback" class="mt-5 mb-5">
            <h5 class="col-12 font-bold mb-1 p-0">
              {{ $t("question_feedback") }} :
            </h5>
            <div class="col-12 p-0 feedback mt-3" v-html="question_feedback" />
          </div>
        </div>
      </section>
    </div>
    <div class="row mx-0">
      <div class="col-lg-4 question-info">
        <div
          v-if="question.actions && !this.timeout"
          class="p-2 actions col-12"
        >
          <div class="row">
            <div
              v-for="(action, index) in question.actions.data"
              :key="index"
              class="col-6 mb-4 mx-auto"
              :class="[
                `${action.key}`,
                {
                  'col-12': action.key === 'btn-main' && index > 1,
                },
              ]"
            >
              <button
                v-if="!loader"
                :class="`Back btn-block p-3 rounded-8 ${action.key}`"
                :style="`background-color: ${action.bg_color}`"
                @click="doAction(action)"
              >
                {{ action.label }}
              </button>
              <div
                v-if="loader ? actionKey == action.key : (loader = false)"
                class="Back btn-block p-3 h-100 rounded-8"
              >
                <i class="fa fa-spinner fa-spin" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import initMathJaxLib from "~/utilities/mathJax";

const components = {
  multiple_choice: () =>
    import("@/components/questions/studet/multiple-choice.vue"),
  single_choice: () => import("@/components/questions/studet/choice.vue"),
  complete: () => import("@/components/questions/studet/complete.vue"),
  drag_drop: () => import("@/components/questions/studet/drag-drop.vue"),
  true_false: () => import("@/components/questions/studet/true-false.vue"),
  matching: () => import("@/components/questions/studet/matching.vue"),
  multiple_matching: () =>
    import("@/components/questions/studet/multiple-matching.vue"),
  hotspot: () => import("@/components/questions/studet/hot-spot.vue"),
};
export default {
  components,
  layout: "default",
  data() {
    return {
      diff: 0,
      minutes: 0,
      seconds: 0,
      remainingTime: "",
      counter: null,
      timeout: false,
      questionNumber: 0,
      answers: null,
      question_feedback: "",
      loader: false,
      actionKey: "",
    };
  },

  computed: {
    start() {
      return this.$store.getters["exams/student/exam"].start;
    },
    examAnswers: {
      get() {
        return this.$store.getters["exams/student/answers"];
      },
      set(answers) {
        this.$store.commit("exams/student/SET_ANSWERS", answers);
      },
    },
    question: {
      get() {
        return this.$store.getters["exams/student/question"];
      },
      set(question) {
        this.$store.commit("exams/student/SET_QUESTION", question);
      },
    },
    exam() {
      return this.$store.getters["exams/student/exam"];
    },
    questionData() {
      return this.question.questionData ? this.question.questionData.data : {};
    },
    finishExam() {
      let actions =
        this.question.practice && this.question.practice.data.actions
          ? this.question.practice.data.actions.data.filter(
              (action) => action.key == "finish_practice"
            )
          : [];
      return actions.length ? actions[0] : {};
    },
    questionType() {
      if (this.question.question_type == "true_false_with_correct") {
        return "true_false";
      }
      if (this.question.question_type == "multiple_choice") {
        return this.questionData.type;
      }

      return this.question.question_type;
    },
  },

  watch: {
    question(val) {
      initMathJaxLib();
    },
    question_feedback(val) {
      initMathJaxLib();
    },
  },

  mounted() {
    initMathJaxLib();
  },
  created() {
    this.question = {};
    if (!this.$route.params.id) {
      return this.$nuxt.error({
        statusCode: 404,
        message: "This page could not be found",
      });
    }
    if (
      !this.question.practice ||
      this.question.practice.data.id != this.$route.params.id
    ) {
      this.startExam();
    }
  },
  methods: {
    startExam() {
      let url = `student/practices/start-practice/${this.$route.params.id}`;
      this.$axios
        .post(url)
        .then((response) => {
          let resp = this.$formatter().deserialize(response.data);
          let exam = resp.data[0].practice.data;

          this.questionNumber += 1;
          this.question = resp.data[0];
          this.answers = [...Array(exam.questions_numbers)].map(() => {
            this.$store.commit("exams/student/SET_EXAM", exam);
            this.$store.commit(
              "exams/student/SET_QUESTION_DATA",
              resp.data[0].questionData.data
            );

            return {};
          });
        })
        .catch((err) => {
          if (err.response) {
            this.$toast.error(err.response.data.errors[0].detail);
          }
          console.log(err);

          // let path = `/student/practice`;
          // this.$router.push(this.localePath({ path }));
        });
    },
    timer() {
      this.diff = this.duration - (((Date.now() - this.start) / 1000) | 0);

      this.minutes = (this.diff / 60) | 0;
      this.seconds = this.diff % 60 | 0;

      this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
      this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;

      this.remainingTime = this.minutes + ":" + this.seconds;

      if (this.diff <= 0) {
        this.timeout = true;
        clearInterval(this.counter);
      }
    },
    loadQuestion(url) {
      this.$axios
        .get(url)
        .then((response) => {
          let resp = this.$formatter().deserialize(response.data);
          this.question = resp.data[0];
          this.$store.commit(
            "exams/student/SET_QUESTION_DATA",
            resp.data[0].questionData.data
          );

          console.log("loadquestion", resp.data[0]);
          this.question_feedback = "";
        })
        .catch((err) => {
          console.log(err);
          let path = `/student/practice`;
          this.$router.push(this.localePath({ path }));
        });
    },
    setAnswer(answers) {
      this.answers = answers;
    },
    doAction(action) {
      this.actionKey = action.key;
      this.loader = true;
      setTimeout(() => {
        this.loader = false;
      }, 500);
      switch (action.key) {
        case "post_answer":
          this.submit(action.endpoint_url);
          break;
        case "next_question":
          this.questionNumber += 1;
          this.loadQuestion(action.endpoint_url);
          break;
        case "previous_question":
          this.questionNumber -= 1;
          this.loadQuestion(action.endpoint_url);
          break;
        case "report":
          this.getReport(action.endpoint_url);
          break;
        default:
          break;
      }
    },
    submit(url) {
      if (!this.answers) return;
      let answersRelation = this.answers.map((ans) => {
        return { id: ans.id, type: ans.type };
      });
      let body = {
        data: [
          {
            type: "question",
            id: this.question.id,
            relationships: {
              answers: {
                data: answersRelation,
              },
            },
          },
        ],
        included: this.answers,
      };
      this.$axios
        .post(url, body)
        .then((response) => {
          let resp = this.$formatter().deserialize(response.data);

          this.question_feedback =
            resp.data[0].questionData.data.question_feedback;
          this.$store.commit(
            "exams/student/SET_QUESTION_DATA",
            resp.data[0].questionData.data
          );

          this.$toast.success(response.data.meta.message);
        })
        .catch((err) => console.log(err));
    },
    endExam() {
      this.loader = true;
      this.$axios
        .post(this.finishExam.endpoint_url)
        .then((response) => {
          let resp = this.$formatter().deserialize(response.data);
          let path = "/student/practice/feedback";
          setTimeout(() => {
            this.loader = false;
          }, 1000);
          this.$store.commit("exams/student/SET_FEEDBACK", resp);
          this.$toast.success(this.$t("practice_finished"));
          this.$router.push(this.localePath({ path }));
        })
        .catch((err) => {
          this.loader = true;
          setTimeout(() => {
            this.loader = false;
          }, 1000);
          console.log(err);
          console.log(err);
          let path = `/student/practice`;
          this.$router.push(this.localePath({ path }));
        });
    },
    getReport() {
      this.$axios
        .post(
          "http://ouredu.testenv.tech/api/v1/ar/student/reports/3/exam_question/4035"
        )
        .then((response) =>
          console.log(response, "res").catch((err) => console.log(err, "err"))
        );
    },
  },
};
</script>
