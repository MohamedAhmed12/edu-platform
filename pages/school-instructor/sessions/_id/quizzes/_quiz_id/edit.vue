<template>
  <section>
    <QuizForm :questions="form.questions" :quiz="form.quiz" />

    <div class="row">
      <div class="col-12">
        <button class="btn btn-primary" @click="update">
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
  components: { QuizForm },
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
    start_at_computed() {
      return this.form.quiz.start_at
        ? this.form.quiz.start_at.toISOString().split("T")[0]
        : "";
    },
    end_at_computed() {
      return this.form.quiz.end_at
        ? this.form.quiz.end_at.toISOString().split("T")[0]
        : "";
    },
  },
  mounted() {
    this.getQuiz()
      .then((response) => {
        let formatter = new Formatter();
        this.form.quiz = formatter.deserialize(response.data);
        return this.getQuestions();
      })
      .then((response) => {
        let formatter = new Formatter();
        this.form.questions = formatter.deserialize(response.data).data;
      });
  },
  methods: {
    getQuiz: function () {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`quizzes/${this.$route.params.quiz_id}`)
          .then((response) => resolve(response))
          .catch((response) => resolve(response));
      });
    },
    getQuestions: function () {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`quizzes/${this.$route.params.quiz_id}/questions`)
          .then((response) => resolve(response))
          .catch((response) => resolve(response));
      });
    },
    updateQuiz: function () {
      let vm = this;
      return new Promise((resolve, reject) => {
        this.$axios
          .put(`quizzes/edit/${vm.form.quiz.id}`, {
            data: {
              id: vm.form.quiz.id,
              type: "quiz",
              attributes: {
                quiz_type: "quiz",
                quiz_time: vm.form.quiz.quiz_time,
                classroom_id: vm.form.quiz.classroom_id,
                classroom_class_session_id: this.$route.params.id,
                // start_at: this.start_at_computed,
                // end_at: this.end_at_computed,
              },
            },
          })
          .then((response) => resolve(response))
          .catch((response) => reject(response));
      });
    },
    updateQuestions: function (quiz_id) {
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
    update: function () {
      let vm = this;
      this.updateQuiz()
        .then((response) => {
          return this.updateQuestions(response.data.data.id);
        })
        .then((data) => {
          vm.$toast.success(vm.$t("Success"));
          vm.$router.go(-1);
        })
        .catch((response) =>
          vm.$toast.error(vm.$t("You can't edit this quiz"))
        );
    },
  },
};
</script>
