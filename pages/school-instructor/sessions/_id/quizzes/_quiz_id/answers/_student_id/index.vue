<template>
  <div class="questions-area bg-white">
    <Loader v-if="loading" />
    <section v-if="!loading" class="row mx-0 w-100">
      <div class="row">
        <div class="col-4">
          <h1>{{ $t("Quiz Information") }}</h1>
          <table class="table table-borderless col-6">
            <tr>
              <th>{{ $t("Student") }}</th>
              <td>{{ $t(studentQuiz.student_name) }}</td>
            </tr>
            <tr>
              <th>{{ $t("Classroom") }}</th>
              <td>{{ studentQuiz.classroom_name }}</td>
            </tr>
            <tr>
              <th>{{ $t("Result") }}</th>
              <td>{{ studentQuiz.quiz_result_percentage }}%</td>
            </tr>
            <tr>
              <th>{{ $t("Time") }}</th>
              <td>{{ $t(studentQuiz.quiz_time) }}</td>
            </tr>
          </table>
        </div>
        <div class="col-8">
          <div
            v-for="question of quizQuestions"
            v-key="question.id"
            class="col-12"
          >
            <h2>{{ question.question_text }}</h2>
            <br>
            <div class="col-6">
              <p
                v-for="option of question.options"
                v-key="option.option_id"
                :class="getAnswerCssClass(option.id)"
              >
                {{ option.option }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from "@/components/loader/index";
import { Formatter } from "sarala-json-api-data-formatter";

export default {
  name: "Answers",
  components: {
    Loader,
  },
  data() {
    return {
      quizQuestions: [],
      studentQuiz: [],
      loading: true,
    };
  },
  computed: {
    answers: function () {
      let answers = {};
      for (let question of this.studentQuiz.studentAnswers.data.questions ||
        []) {
        for (let answer of question.answers) {
          answers[answer.option_id] = answer;
        }
      }
      return answers;
    },
  },
  mounted() {
    this.loading = true;
    this.getQuizQuestions()
      .then((quizQuestions) => {
        this.quizQuestions = quizQuestions;
        return this.getStudentResults();
      })
      .then((studentQuiz) => {
        this.studentQuiz = studentQuiz;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    getStudentResults() {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(
            `quizzes/${this.$route.params.quiz_id}/students/${this.$route.params.student_id}`
          )
          .then((response) => {
            resolve(new Formatter().deserialize(response.data));
          })
          .catch((error) => reject(error));
      });
    },
    getQuizQuestions() {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`quizzes/${this.$route.params.quiz_id}/questions`)
          .then((response) => {
            resolve(new Formatter().deserialize(response.data).data);
          })
          .catch((error) => reject(error));
      });
    },
    getAnswerCssClass(id) {
      if (!this.answers[id]) return false;

      let is_correct_answer = this.answers[id].is_correct_answer;

      if (!is_correct_answer) return "wrong-answer";
      else if (is_correct_answer) return "correct-answer";
    },
  },
};
</script>

<style scoped>
.correct-answer {
  color: green;
}
.wrong-answer {
  color: red;
}
</style>
