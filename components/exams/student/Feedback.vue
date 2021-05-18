<template>
  <div
    v-if="feedback.length != 0"
    class="subjects exam-results bg-white container"
  >
    <h1 class="text-center mb-3">
      {{ $t("the_feedback") }}
    </h1>

    <!--  instructor live-lessons exams for single student  -->
    <div
      v-if="participantExams.length != 0"
      class="col-lg-12 col-md-12 col-sm-12 font-bold mb-5 px-0"
    >
      <div class="row mx-2 m-15 mb-3">
        <div class="col-12 unit mb-3">
          <h2 class="h1 mb-4">
            {{ $t("other_exams") }}
          </h2>
          <div class="row">
            <nuxt-link
              v-for="(exam, index) in participantExams"
              :key="index"
              class="col-4 mb-3"
              :title="exam"
              :to="{ params: { id: index } }"
            >
              <div class="btn button text-white w-100">
                <p>{{ exam }}</p>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <!-- challenges -->
    <div class="col-lg-12 col-md-12 col-sm-12 font-bold mb-5 px-0">
      <div class="row mx-2 m-15 mb-3">
        <div v-if="feedback.challenges" class="col-12 unit mb-3">
          <h2 class="h1 mb-2">
            {{ $t("challengers") }}
          </h2>
          <div class="row">
            <div
              v-for="challenger in feedback.challenges.data"
              :key="challenger.id"
              class="col-2 btn"
              :title="challenger.name + ' Feedback'"
              @click="getSingleFeedback(challenger)"
            >
              <img
                class="w-75 rounded-circle p-2"
                :src="challenger.profile_picture"
              />
              <p>{{ challenger.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row mx-2 m-15 mb-3">
        <div v-if="feedback.recommendation" class="col-12 unit mb-3">
          <h2 class="h1 mb-2">
            {{ $t("recommendations") }}
          </h2>
          <div
            v-for="recommendation in feedback.recommendation.data
              .recommendationSubjectFormat.data"
            :key="recommendation.id"
            class="recommendations mb-4 d-flex align-items-center justify-content-between justify-content-xl-start"
          >
            <h4 class="flex-grow">
              <i class="fas fa-circle" /> {{ recommendation.title }}
            </h4>

            <nuxt-link
              class="button text-center ml-4"
              :to="
                localePath({
                  path: `/student/subject/${feedback.subject_id}/sections/${recommendation.id}`,
                })
              "
            >
              {{ $t("view") }}
            </nuxt-link>
          </div>
          <div class="text-right">
            <button class="button text-center ml-4" @click="generate">
              {{ $t("create practice") }}
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="feedback.feedback && feedback.feedback.data.result_percent"
        class="row mx-2 m-15"
      >
        <div class="col-12 unit">
          <div class="mb-4">
            <h4 class="d-inline">
              <i class="fas fa-circle" />{{ $t("result") }}
            </h4>
            <p class="d-inline ml-4">
              {{ feedback.feedback.data.result }}
            </p>
          </div>

          <div class="mb-4">
            <h4 class="d-inline">
              <i class="fas fa-circle" />{{ $t("result_percent") }}
            </h4>
            <p class="d-inline ml-4">
              {{ feedback.feedback.data.result_percent }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- live lessons  -->
    <div class="row mx-2 m-15">
      <div
        class="col-sm-7 col-md-6 mx-auto mx-md-0 col-lg-4 col-xl-3 pb-4 px-2"
      >
        <schedule v-if="vcr" :schedule="vcr" />
      </div>
    </div>

    <!-- feedback questions -->
    <div class="my-auto">
      <h1 class="mb-4 text-center">
        {{ feedback.title }}
      </h1>
    </div>
    <div class="row m-15">
      <div class="col-lg-12 col-md-12 col-sm-12 mt-30">
        <div class="row">
          <div class="col-md-6 col-sm-8 my-auto">
            <h3>{{ $t("click_on_red_button_to_view_right_answer") }}</h3>
          </div>
        </div>

        <div class="row m-t-20">
          <div class="col-md-12">
            <ul class="nav justify-content-center" role="tablist">
              <li
                v-for="(question, index) in questions"
                :key="question.id"
                class="nav-item"
              >
                <a
                  class="nav-link"
                  :class="{
                    danger: selectedQuestion.id === question.id,
                    sucsess:
                      selectedQuestion.id !== question.id &&
                      question.questionData.data.is_correct_answer,
                    warning:
                      selectedQuestion.id !== question.id &&
                      !question.questionData.data.is_correct_answer,
                  }"
                  href="#"
                  @click.prevent="selectedQuestion = question"
                  >{{ index + 1 }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 tab-content">
        <ExamQuestion v-if="selectedQuestion.id" :question="selectedQuestion" />
      </div>
    </div>
    <div
      v-if="feedback.length != 0"
      class="practice-feedback mx-0 bg-white pb-4 pl-3"
    >
      <div
        v-if="
          feedback.start_time ||
          feedback.finished_time ||
          feedback.time_to_solve
        "
        class="container"
      >
        <div class="row">
          <h2 class="text-dark mb-3 question-title">{{ $t("Exam") }}:</h2>
          <div
            v-if="feedback.start_time"
            class="mb-4 col-12 align-items-center px-0 mx-0"
          >
            <div class="row">
              <h5
                class="mb-4 mb-lg-0 col-sm-12 col-lg-3 d-inline-flex align-self-center"
              >
                {{ $t("Start Time") }}:
              </h5>
              <h5 class="unit2 col-sm-12 col-lg-6">
                {{ toPeriodFormat(feedback.start_time) }}
              </h5>
            </div>
          </div>
          <div v-if="feedback.finished_time" class="mb-4 col-12 mx-0 px-0">
            <div class="row">
              <h5
                class="mb-4 mb-lg-0 col-sm-12 col-lg-3 d-inline-flex align-self-center"
              >
                {{ $t("End Time") }}:
              </h5>
              <h5 class="unit2 col-sm-12 col-lg-6">
                {{ toPeriodFormat(feedback.finished_time) }}
              </h5>
            </div>
          </div>
          <div v-if="feedback.time_to_solve" class="mb-4 col-12 mx-0 px-0">
            <div class="row">
              <h5
                class="mb-4 mb-lg-0 col-sm-12 col-lg-3 d-inline-flex align-self-center"
              >
                {{ $t("exam_time_to_solve") }}:
              </h5>
              <h5 class="unit2 col-sm-12 col-lg-6">
                {{ scondsToTime(this.feedback.time_to_solve) }}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "~/assets/css/feedback.css";

import initMathJaxLib from "~/utilities/mathJax";
import ExamQuestion from "@/components/questions/studet/feedback/Question";
import SingleLivelesson from "@/components/live-lessons/student/SingleLivelesson";
import schedule from "~/components/student/vcr/schedule.vue";
import { log } from "util";

export default {
  name: "ExamResultsPanel",

  components: { ExamQuestion, SingleLivelesson, schedule },
  layout: "default",
  props: {
    feedbackEndpoint: {
      type: String,
      default: "",
    },
  },

  data: function () {
    return {
      feedback: [],
      recommendations: [],
      vcr: null,
      questions: [],
      selectedQuestion: {},
      participantExams: [],
    };
  },

  watch: {
    selectedQuestion(val) {
      initMathJaxLib();
    },
  },

  beforeMount() {
    initMathJaxLib();
  },

  mounted() {
    this.load();
    this.getLiveLessonsExams();
  },

  methods: {
    getSingleFeedback(student) {
      // this.$store.commit("localStorage/SET_SINGLEFEEDBACK", student);

      let path = `/student/exams/${this.$route.params.id}/challenge/feedback`;
      this.$router.push(this.localePath({ path }));
    },
    load() {
      let url =
        this.feedbackEndpoint || `/student/exams/${this.$route.params.id}`;

      this.$axios
        .get(url)
        .then((response) => {
          this.feedback = this.subject = this.$formatter().deserialize(
            response.data
          );

          this.questions = this.feedback.questions
            ? this.feedback.questions.data
            : [];
          this.vcr = this.feedback.vcrSpot ? this.feedback.vcrSpot.data : null;
          this.recommendations = this.feedback.recommendation
            ? this.feedback.recommendation.data
            : {};

          if (Array.isArray(this.questions) && this.questions.length > 0) {
            this.selectedQuestion = this.questions[0];
          }
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    generate() {
      let selectedSections = this.recommendations.recommendationSubjectFormat.data.map(
        (section) => parseInt(section.id)
      );
      let body = {
        type: "exam",
        id: "null",
        attributes: {
          subject_id: parseInt(this.selectedQuestion.exam.data.subject_id),
          subject_format_subject_ids: selectedSections,
        },
      };
      this.$axios
        .post("student/practices/generate-practice", { data: body })
        .then((response) => {
          let data = this.$formatter().deserialize(response.data);
          this.$toast.success("practice created");
          if (data.data && !data.data.length && data.meta.message) {
            this.$toast.error(data.meta.message);
            return;
          }
          let path = `/student/practice/${data.id}`;
          this.$router.push(this.localePath({ path }));
        })
        .catch((err) => {
          console.log(err);
          if (
            err.response &&
            err.response.data.errors.length &&
            err.response.data.errors[0].detail
          ) {
            this.$toast.error(err.response.data.errors[0].detail);
          }
        });
    },
    scondsToTime(duration) {
      if (!duration) {
        return;
      }
      var seconds = Math.floor(duration % 60),
        minutes = Math.floor((duration / 60) % 60),
        hours = Math.floor((duration / (60 * 60)) % 24);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return hours + ":" + minutes + ":" + seconds;
    },
    toPeriodFormat(date) {
      if (!date) {
        return;
      }

      date = date ? date.split(" ") : " ";

      let days = date[0];
      let time = date[1];

      time = time.split(":");

      var hours = time[0],
        minutes = time[1],
        seconds = time[2],
        ampm = hours >= 12 ? "pm" : "am";

      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'

      var strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;

      return days + " " + strTime;
    },
    getLiveLessonsExams() {
      this.$axios
        .get(
          `instructor/online-sessions/${this.$route.params.session}/participants`
        )
        .then((response) => {
          let res = this.$formatter().deserialize(response.data);
          this.participantExams = res.data[0].exams;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
