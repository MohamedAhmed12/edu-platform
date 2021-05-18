<template>
  <div class="questions-area bg-white">
    <div class="row mx-0 w-100">
      <div class="col-lg-4">
        <!-- ======== question info ,eft side ========= -->
        <section class="question-info w-100 h-100 pt-2 pl-1">
          <div class="row mx-0">
            <div class="quis-block col-sm-6 col-md-12 col-6 px-2">
              <p
                class="title-font text-center text-md-left"
                v-html="questionData.description"
              />
            </div>
            <div
              v-if="!options.direct"
              class="quis-block col-sm-6 col-md-12 col-6 px-2"
            >
              <p class="title-font timeOut text-center text-md-left">
                {{ remainingTime }}
              </p>
              <p class="title-font text-center text-md-left">
                {{ $t("Time Remaining") }}
              </p>
            </div>

            <div
              v-if="options.direct && directExamDateTime != null"
              class="quis-block col-sm-6 col-md-12 col-6 px-2"
            >
              <div class="start-date mb-5">
                <p class="title-font timeOut text-center text-md-left">
                  {{ directExamDateTime.date }}
                </p>
                <p class="title-font text-center text-md-left">
                  {{ $t("start_date") }}
                </p>
              </div>
              <div class="start-time mb-3 row">
                <div class="col-6">
                  <p class="timeOut text-center text-md-left">
                    {{ directExamDateTime.start_time }}
                  </p>
                  <p class="text-center text-md-left">
                    {{ $t("Start Time") }}
                  </p>
                </div>
                <div class="col-6">
                  <p class="timeOut text-center text-md-left">
                    {{ directExamDateTime.end_time }}
                  </p>
                  <p class="text-center text-md-left">
                    {{ $t("End Time") }}
                  </p>
                </div>
              </div>
            </div>
            <ul
              v-if="exam.questions_numbers"
              class="list-unstyled questions-list quis-block col-12"
            >
              <li
                v-for="q in exam.questions_numbers"
                :key="q"
                :class="`d-inline-block p-3 rounded-8-8 mr-2 font-bold ${
                  questionNumber == q ? 'active' : ''
                }`"
              >
                <a href="#">{{ q }}</a>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <div class="col-lg-4 order-3">
        <section class="question-info w-100 pt-2 pl-1 h-100">
          <div
            v-if="question.actions && !this.timeout"
            class="p-2 actions my-1 col-12"
          >
            <div class="row">
              <template v-for="(action, index) in question.actions.data">
                <!-- not to show report button if showReport is false -->
                <div
                  v-if="action.key !== 'report' || options.showReport"
                  :key="index"
                  class="col-6 mb-4 mx-auto"
                  :class="[
                    `${action.key}`,
                    {
                      'col-12 ':
                        index === question.actions.data.length - 1 && index > 2,
                      'd-none': index === 0,
                    },
                  ]"
                >
                  <button
                    v-if="!loader"
                    :class="`Back btn-block p-3 h-100 rounded-8 ${action.key} ${
                      action.key == 'finish_exam' ? 'd-none' : ''
                    }`"
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
              </template>
            </div>
          </div>
        </section>
      </div>
      <div class="col-lg-8 order-2">
        <section class="quis-details p-3 bg-white h-auto quis-details matching">
          <div class="container align-self-center the-question">
            <div class="d-flex align-items-end mt-2 mb-2 mr-5">
              <a
                v-if="finishExam.endpoint_url && !loader"
                class="btn btn-main pl-5 pt-3 pb-3 pr-5 mr-3 rounded-8 text-center"
                :class="{ disabled: loader }"
                :disable="loader"
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
              <div
                v-if="question.actions && !this.timeout"
                class="actions my-1"
              >
                <div
                  v-if="
                    question.actions.data[0].key === 'report' &&
                    options.showReport
                  "
                  class="p-1 pl-2 pr-2 rounded-circle"
                  :class="[`${question.actions.data[0].key}`]"
                >
                  <button
                    :class="`Back ${question.actions.data[0].key} bg-transparent`"
                    title="Report Question"
                    @click="showModal = !showModal"
                  >
                    <i aria-hidden="true" class="fa fa-2x fa-info-circle" />
                  </button>
                </div>
              </div>

              <ReportModal
                v-if="showModal"
                :action="question.actions.data[0]"
                @close="showModal = false"
              />
            </div>

            <component
              :is="questionType"
              v-if="question.question_type"
              class="mb-5 mt-5"
              :question="question"
              :question-number="questionNumber"
              @setAnswer="setAnswer"
            />
          </div>
        </section>
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
  hotspot: () => import("@/components/questions/studet/hot-spot.vue"),
  matching: () => import("@/components/questions/studet/matching.vue"),
  multiple_matching: () =>
    import("@/components/questions/studet/multiple-matching.vue"),
  ReportModal: () => import("@/components/exams/student/ReportModal.vue"),
};

export default {
  components,
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          challenge: false,
          direct: false,
          showFeedback: true,
          showReport: true,
        };
      },
    },
  },
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
      directExamDateTime: null,
      showModal: false,
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
      let actions = [];

      if (
        !this.options.direct &&
        this.question.exam &&
        this.question.exam.data.actions
      ) {
        actions = this.question.exam.data.actions.data.filter(
          (action) => action.key == "finish_exam"
        );
      }

      if (this.options.direct && this.question.actions) {
        actions = this.question.actions.data.filter(
          (action) => action.key == "finish_exam"
        );
      }

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
      this.directExamDateTime = val.exam ? val.exam.data : {};
    },
  },
  beforeMount() {
    initMathJaxLib();
  },
  mounted() {
    initMathJaxLib();
    this.question = {};
    if (!this.$route.params.id) {
      return this.$nuxt.error({
        statusCode: 404,
        message: "This page could not be found",
      });
    }
    if (
      !this.question.exam ||
      this.question.exam.data.id != this.$route.params.id
    ) {
      this.startExam();
    }
  },
  methods: {
    startExam() {
      const endpoint = this.options.direct ? "direct" : "start";
      let examId = !this.options.challenge
        ? this.$route.params.id
        : this.$store.getters["exams/student/challengeExamId"];

      this.$axios.student.exam[endpoint](examId)
        .then((response) => {
          let resp = this.$formatter().deserialize(response.data);

          let exam = this.options.direct
            ? resp.data[0]
            : resp.data[0].exam.data;

          this.duration = exam.time_to_solve;

          exam.start = Date.now();

          this.$store.commit("exams/student/SET_EXAM", exam);
          this.$store.commit(
            "exams/student/SET_QUESTION_DATA",
            resp.data[0].questionData.data
          );
          this.timer();
          // setInterval(console.log(this.diff), 1000);
          this.counter = setInterval(this.timer, 1000);
          this.questionNumber = +resp.links.self.slice(
            resp.links.self.indexOf("page=") + 5
          );
          this.question = resp.data[0];
          this.answers = [];
        })
        .catch((err) => {
          if (err.response) {
            this.$toast.error(err.response.data.errors[0].detail);
          }
          console.log(err);

          let path = `/student/exams`;
          this.$router.push(this.localePath({ path }));
        });
    },
    timer() {
      this.diff = this.duration - (((Date.now() - this.start) / 1000) | 0);

      if (this.diff < 5) {
        this.endExam();
        // console.log("data");
        this.timeout = true;
        clearInterval(this.counter);
        // console.log(this.diff);
      }

      this.minutes = (this.diff / 60) | 0;
      this.seconds = this.diff % 60 | 0;

      this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
      this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;

      this.remainingTime = this.minutes + ":" + this.seconds;
      if (this.diff <= 30) {
        let timeout = document.querySelector(".timeOut");
        if (timeout) {
          timeout.style.color = "red";
        }
      }
    },
    loadQuestion(url) {
      this.$axios
        .get(url)
        .then((response) => {
          let resp = this.$formatter().deserialize(response.data);
          this.questionNumber = +resp.links.self.slice(
            resp.links.self.indexOf("page=") + 5
          );
          this.question = resp.data[0];
          this.answers = [];
          this.$store.commit(
            "exams/student/SET_QUESTION_DATA",
            resp.data[0].questionData.data
          );
        })
        .catch((err) => {
          console.log(err);
          let path = `/student/exams`;
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
          this.loadQuestion(action.endpoint_url);
          break;
        case "previous_question":
          this.loadQuestion(action.endpoint_url);
          break;
        // case "report":
        //   // this.options.showReport && this.getReport(action.endpoint_url);
        //   break;
        default:
          break;
      }
    },
    submit(url) {
      if (!this.answers.length > 0) {
        return this.$toast.error(
          this.$t("please_answer_the_question_to_proceed")
        );
      }
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
          // this.$store.commit(
          // 	'exams/student/SET_QUESTION_DATA',
          // 	response.data[0].questionData.data
          // )
          this.$toast.success(response.data.meta.message);

          const nextQAction = this.question.actions.data.find(
            (q) => q.key === "next_question"
          );

          this.loadQuestion(nextQAction.endpoint_url);
        })
        .catch((err) => console.log(err));
    },
    endExam() {
      this.loader = true;
      this.$axios
        .post(
          this.finishExam.endpoint_url ||
            `student/exams/finish-exam/${this.exam.id}`
        )
        .then((response) => {
          if (this.options.showFeedback == true) {
            const data = this.$formatter().deserialize(response.data);
            this.$store.commit("exams/student/SET_FEEDBACK", data);
          }

          let path =
            this.options.showFeedback == false
              ? "/student/exams"
              : `/student/exams/${this.question.exam.data.id}/feedback`;
          setTimeout(() => {
            this.loader = false;
          }, 1000);
          this.$toast.success(this.$t("exam_finished"));
          this.$router.push(this.localePath({ path }));
        })
        .catch((err) => {
          this.loader = true;
          setTimeout(() => {
            this.loader = false;
          }, 1000);
          console.log(err);
          // let path = `/student/exams`;
          // this.$router.push(this.localePath({path}));
        });
    },
  },
};
</script>
