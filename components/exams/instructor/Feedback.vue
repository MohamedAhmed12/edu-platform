<template>
  <div
    v-if="feedback.length != 0"
    class="subjects exam-results bg-white container"
  >
    <div class="col-md-3 mt-2 mb-md-0 col-12 session__start">
      <a
        class="btn btn-block rounded-8 text-center btn-main px-1 py-3"
        :href="startSession.endpoint_url"
      >
        {{ $t("start_session") }}</a
      >
    </div>

    <!-- feedback Result  -->
    <h1 class="text-center mt-5">
      {{ $t("the_feedback") }}
    </h1>
    <div
      v-if="feedback.feedback"
      class="col-lg-12 col-md-12 col-sm-12 font-bold mb-5 px-0"
    >
      <div class="row mx-2 m-15">
        <div v-if="feedback.recommendation" class="col-12 unit">
          <p class="h1">
            recommendations
          </p>
          <div
            v-for="recommendation in feedback.recommendation.data
              .recommendationSubjectFormat.data"
            :key="recommendation.id"
            class="recommendations mb-4 d-flex align-items-center"
          >
            <h4 class="d-inline flex-grow">
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
        </div>
      </div>
      <div class="row mx-2 m-15">
        <div class="col-12 unit">
          <div class="mb-4">
            <h4 class="d-inline">
              <i class="fas fa-circle" />{{ $t("result") }}
            </h4>
            <p class="d-inline ml-4">
              {{ feedback.feedback ? feedback.feedback.data.result : "" }}
            </p>
          </div>

          <div class="mb-4">
            <h4 class="d-inline">
              <i class="fas fa-circle" />{{ $t("result_percent") }}
            </h4>
            <p class="d-inline ml-4">
              {{
                feedback.feedback ? feedback.feedback.data.result_percent : ""
              }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- live lessons  -->
    <SingleLivelesson v-if="vcr" :vcr="vcr" />

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
          <h2 class="text-dark mb-3" style="font-size: 2rem;">
            {{ $t("Exam") }}:
          </h2>
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
import initMathJaxLib from "~/utilities/mathJax";
import ExamQuestion from "@/components/questions/studet/feedback/Question";
import SingleLivelesson from "@/components/live-lessons/student/SingleLivelesson";
import { Formatter } from "sarala-json-api-data-formatter";

export default {
  name: "Report",
  components: { ExamQuestion, SingleLivelesson },
  layout: "default",

  head: {
    link: [
      {
        hid: "feedback",
        rel: "stylesheet",
        href: require("~/assets/css/feedback.css"),
      },
    ],
  },

  data: function () {
    return {
      feedback: [],
      recommendations: [],
      vcr: null,
      questions: [],
      selectedQuestion: {},
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
  },

  methods: {
    load() {
      this.$axios
        .get(`/instructor/vcr/student-report/${this.$route.params.id}`)
        .then((response) => {
          this.feedback = this.subject = this.$formatter().deserialize(
            response.data
          );

          if (this.feedback.questions) {
            this.questions = this.feedback.questions.data;
          }
          if (this.feedback.actions) {
            this.startSession = this.feedback.actions.data[0];
          }
          if (this.feedback.recommendation) {
            this.recommendations = this.feedback.recommendation.data;
          }

          if (Array.isArray(this.questions) && this.questions.length > 0) {
            this.selectedQuestion = this.questions[0];
          }
        })
        .catch((error) => {
          console.log({ error });
        });
      // return this.$store.getters["exams/student/feedback"];
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
  },
};
</script>
