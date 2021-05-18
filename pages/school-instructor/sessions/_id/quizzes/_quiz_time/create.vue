<template>
  <section>
    <QuizForm :questions="form.questions" :quiz="form.quiz" />

    <div class="row">
      <div class="col-12">
        <button class="btn btn-primary" @click="store">
          {{ $t("Submit") }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { Formatter } from "sarala-json-api-data-formatter";

import QuizForm from "@/components/quizzes/QuizForm";

export default {
  components: {
    QuizForm,
  },
  layout: "default",
  data() {
    return {
      form: {
        quiz: {
          quiz_time: this.$route.params.quiz_time,
          classroom_class_session_id: this.$route.params.id,
          classroom_id: this.$route.query.classroom_id,
          // start_at: null,
          // end_at: null,
        },
        questions: [],
      },
    };
  },
  computed: {
    // start_at_computed() {
    //   return this.form.quiz.start_at
    //     ? this.form.quiz.start_at.toISOString().split("T")[0]
    //     : "";
    // },
    // end_at_computed() {
    //   return this.form.quiz.end_at
    //     ? this.form.quiz.end_at.toISOString().split("T")[0]
    //     : "";
    // },
  },
  mounted() {
    if (this.$route.query.quiz_id) {
      let vm = this;
      this.getQuiz()
        .then((response) => {
          let formatter = new Formatter();
          this.form.quiz = formatter.deserialize(response.data);
          this.form.quiz.id = "new";
          return this.getQuestions();
        })
        .then((response) => {
          let formatter = new Formatter();
          this.form.questions = formatter.deserialize(response.data).data;

          for (let question of this.form.questions) {
            question.id = `new_${question.id}`;
            delete question.quiz_id;
            for (let option of question.options) {
              option.id = `new_${option.id}`;
              delete option.question_id;
            }
          }
        });
    }
  },
  methods: {
    getQuiz: function () {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`quizzes/${this.$route.query.quiz_id}`)
          .then((response) => resolve(response))
          .catch((response) => reject(response));
      });
    },
    getQuestions: function () {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`quizzes/${this.$route.query.quiz_id}/questions`)
          .then((response) => resolve(response))
          .catch((response) => reject(response));
      });
    },
    storeQuiz: function () {
      let vm = this;
      return new Promise((resolve, reject) => {
        this.$axios
          .post(`quizzes/create`, {
            data: {
              id: null,
              type: "quiz",
              attributes: {
                quiz_type: "quiz",
                quiz_time: vm.form.quiz.quiz_time,
                classroom_id: vm.form.quiz.classroom_id,
                classroom_class_session_id: vm.$route.params.id,
                // start_at: vm.start_at_computed,
                // end_at: vm.end_at_computed,
                parent_quiz_id: vm.$route.query.quiz_id,
              },
            },
          })
          .then((response) => resolve(response))
          .catch((response) => reject(response));
      });
    },
    storeQuestions: function (quiz_id) {
      return new Promise((resolve, reject) => {
        for (let question of this.form.questions) {
          question.quiz_id = quiz_id;
        }
        this.$axios
          .post(`quizzes/${quiz_id}/update-questions`, {
            data: {
              type: "quiz_question",
              id: quiz_id,
              attributes: {
                questions: this.form.questions,
              },
            },
          })
          .then((response) => resolve(response))
          .catch((response) => reject(response));
      });
    },
    store: function () {
      this.storeQuiz()
        .then((response) => {
          return this.storeQuestions(response.data.data.id);
        })
        .then((data) => {
          this.$toast.success("Success");
          this.$router.go(-1);
        })
        .catch((response) => this.$toast.error("Fail"));
    },
  },
};
</script>
