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
          </div>
        </section>
      </div>
      <div class="col-lg-4 order-3">
        <section class="question-info w-100 pt-2 pl-1 h-100">
          <div v-if="question.actions" class="p-2 actions my-1 col-12">
            <div class="row">
              <template v-for="(action, index) in question.actions.data">
                <!-- not to show report button if showReport is false -->
                <div
                  :key="index"
                  class="col-6 mb-4 mx-auto"
                  :class="[`${action.key}`, { 'd-none': index === 0 }]"
                >
                  <button
                    :class="`Back btn-block p-3 h-100 rounded-8 ${action.key} `"
                    style="font-size: 17px;"
                    @click="submit(action.endpoint_url)"
                  >
                    {{ action.label }}
                  </button>
                </div>
              </template>
            </div>
          </div>
        </section>
      </div>
      <div class="col-lg-8 order-2">
        <section class="quis-details p-3 bg-white h-auto quis-details matching">
          <!-- ======== answers percentage progressbar ========= -->
          <AnswerPercentageModal
            v-if="correct_answer_percentage || wrong_answer_percentage"
            :correct_answer_percentage="correct_answer_percentage"
            :wrong_answer_percentage="wrong_answer_percentage"
          />
          <!-- question  -->
          <div class="container align-self-center the-question">
            <component
              :is="
                question.question_type == 'true_false_with_correct'
                  ? 'true_false'
                  : question.question_type
              "
              v-if="question.question_type"
              class="mb-5 mt-5"
              :question="question"
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
import { log } from "util";
import { createNamespacedHelpers } from "vuex";

const { mapActions } = createNamespacedHelpers("competition");

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
  AnswerPercentageModal: () =>
    import("@/components/competition/AnswerPercentageModal.vue"),
};

export default {
  components,
  props: {
    options: {
      type: Object,
      default: () => {
        return {
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
      duration: 0,
      answers: [],
      answered: false,
      showModal: false,
    };
  },
  computed: {
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
    competition() {
      return this.$store.getters["competition/competitionData"];
    },
    questionData() {
      return this.question.questionData ? this.question.questionData.data : {};
    },
    correct_answer_percentage() {
      return this.$store.getters["competition/correctAnswerPercentage"];
    },
    wrong_answer_percentage() {
      return this.$store.getters["competition/wrongAnswerPercentage"];
    },
  },
  watch: {
    question(val) {
      initMathJaxLib();
      let data = { questionCorrectRatio: null, questionNotCorrectRatio: null };
      this.$store.dispatch("competition/setAnswersPercentages", data);
    },
    diff() {
      if (this.diff <= 1) {
        clearInterval(this.counter);
        let nextQAction;
        let finishCompetitionAction;
        let post_answer = this.question.actions.data.find((action) => {
          return action.key === "post_answer";
        });
        this.submit(post_answer.endpoint_url);
        this.answered = true;

        this.question.actions.data.map((action) => {
          if (action.key === "next_question") {
            return (nextQAction = action);
          }
          if (action.key === "finish_competition") {
            return (finishCompetitionAction = action);
          }
        });

        if (nextQAction) {
          setTimeout(() => {
            this.loadQuestion(nextQAction.endpoint_url);
          }, 4000);
        }

        if (finishCompetitionAction) {
          let data = {
            url: finishCompetitionAction.endpoint_url,
            id: this.$route.params.id,
          };

          setTimeout(() => {
            this.finishCompetition(data);
          }, 4000);
        }
      }
    },
  },
  beforeMount() {
    initMathJaxLib();
  },
  mounted() {
    initMathJaxLib();
    this.question = {};
    this.answers = [];

    if (!this.$route.params.id) {
      return this.$nuxt.error({
        statusCode: 404,
        message: "This page could not be found",
      });
    }

    try {
      this.setInitialData();
    } catch (err) {
      console.log(err);
      let path = `/student/competitions`;
      this.$router.push(this.localePath({ path }));
    }
  },
  beforeDestroy() {
    return this.$store.commit("competition/SET_COMPETITION", null);
  },
  updated() {},
  methods: {
    setInitialData() {
      this.duration = this.competition.time_to_solve;
      this.diff = this.competition.time_to_solve;

      this.competition.start = Date.now();

      this.$store.commit("competition/SET_COMPETITION", this.competition);
      this.$store.commit(
        "exams/student/SET_QUESTION_DATA",
        this.competition.questionData.data
      );

      this.timer();
      this.counter = setInterval(this.timer, 1000);

      this.question = this.competition;
    },
    timer() {
      if (this.answered) {
        return;
      }

      this.diff =
        this.duration - (((Date.now() - this.competition.start) / 1000) | 0);

      this.minutes = (this.diff / 60) | 0;
      this.seconds = this.diff % 60 | 0;

      this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
      this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;

      this.remainingTime = this.minutes + ":" + this.seconds;

      let timeout = document.querySelector(".timeOut");
      this.diff <= 10
        ? (timeout.style.color = "red")
        : (timeout.style.color = "#3f3658");
    },
    loadQuestion(url) {
      this.$axios
        .get(url)
        .then((response) => {
          let resp = this.$formatter().deserialize(response.data);
          this.competition.start = Date.now();
          this.timer();
          this.counter = setInterval(this.timer, 1000);
          this.question = resp.data[0];
          this.answered = false;

          this.$store.commit("competition/SET_COMPETITION", this.competition);
          this.$store.commit(
            "exams/student/SET_QUESTION_DATA",
            resp.data[0].questionData.data
          );
        })
        .catch((err) => {
          console.log(err);
          let path = `/student/competitions`;
          this.$router.push(this.localePath({ path }));
        });
    },
    setAnswer(answers) {
      this.answers = answers;
    },
    submit(url) {
      let answersRelation = [];

      if (this.answers != []) {
        answersRelation = this.answers.map((ans) => {
          return { id: ans.id, type: ans.type };
        });
      }

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
        included: this.answers || [],
      };

      this.$axios
        .post(url, body)
        .then((response) => {
          this.$toast.success(response.data.meta.message);
        })
        .catch((err) => {
          console.log(err);
          let path = `/student/competitions`;
          this.$router.push(this.localePath({ path }));
        });
    },
    ...mapActions(["finishCompetition"]),
  },
};
</script>
