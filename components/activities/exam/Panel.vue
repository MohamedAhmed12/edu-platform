<template>
  <div class="subjects exam-results">
    <div class="row m-15">
      <div class="col-lg-12 col-md-12 col-sm-12 mt-30">
        <div class="row">
          <div class="col-md-6 col-sm-8 my-auto">
            <h3>{{ $t("click_on_red_button_to_view_right_answer") }}</h3>
          </div>
          <div class="col-md-6 col-sm-4 text-right p-r-30">
            <h3>
              <!-- <img class="img-fluid" src="img/Wissam.PNG" />-->
              {{ feedback.result }}
            </h3>
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
    <div class="row content py-4">
      <div class="col-md-12 tab-content">
        <ExamQuestion v-if="selectedQuestion.id" :question="selectedQuestion" />
      </div>
    </div>
  </div>
</template>

<script>
import ExamQuestion from "@/components/questions/studet/feedback/Question";

export default {
  name: "ExamResultsPanel",
  components: { ExamQuestion },
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
      examResult: {},
      feedback: {},
      questions: null,
      recommendation: null,
      selectedQuestion: {},
    };
  },

  created() {
    const examId = this.$route.params.exam;
    this.getExamData(examId);
  },

  methods: {
    getExamData(examId) {
      this.$axios
        .get(`student-teacher/learning-performance/exam-performance/${examId}`)
        .then((response) => {
          this.examResult = this.$formatter().deserialize(response.data);

          // set feedback
          const feadback =
            this.examResult.feedback && this.examResult.feedback.data;
          if (feadback) this.feedback = feadback;

          // set recommendation
          const recommendation =
            this.examResult.recommendation &&
            this.examResult.recommendation.data &&
            this.examResult.recommendation.data.recommendationSubjectFormat &&
            this.examResult.recommendation.data.recommendationSubjectFormat
              .data;

          if (recommendation) this.recommendation = recommendation;

          // set questions
          const questions =
            this.examResult.questions && this.examResult.questions.data;
          if (questions) this.questions = questions;

          // set the default selectedQuestion
          if (Array.isArray(questions) && questions.length > 0) {
            this.selectedQuestion = questions[0];
          }
        });
    },
  },
};
</script>
<style scoped></style>
