<template>
  <section>
    <HomeworkForm
      :end_at="true"
      :questions="form.questions"
      :quiz="form.homework"
      :start_at="true"
    />

    <div class="row">
    <div class="col-lg-9 col-12 mx-auto">
        <button class="btn btn-success" @click="store">
          {{ $t("Submit") }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { Formatter } from "sarala-json-api-data-formatter";

import HomeworkForm from "@/components/quizzes/QuizForm";

export default {
  components: {
    HomeworkForm,
  },
  layout: "default",
  data() {
    return {
      form: {
        homework: {
          quiz_type: "homework",
          classroom_class_session_id: this.$route.params.id,
          classroom_id: this.$route.query.classroom_id,
          end_at: null,
          end_at_hour: null,
          end_at_minute: null,
          start_at: null,
          start_at_hour: null,
          start_at_minute: null,
        },
        questions: [],
      },
    };
  },
  computed: {
    start_at_computed() {
      let date = this.form.homework.start_at
        ? this.form.homework.start_at.toISOString().split("T")[0]
        : "";
      return `${date} ${this.form.homework.start_at_hour}:${this.form.homework.start_at_minute}:00.000`;
    },
    end_at_computed() {
      let date = this.form.homework.end_at
        ? this.form.homework.end_at.toISOString().split("T")[0]
        : "";
      return `${date} ${this.form.homework.end_at_hour}:${this.form.homework.end_at_minute}:00.000`;
    },
  },
  mounted() {},
  methods: {
    // getHomework: function () {
    //   return new Promise((resolve, reject) => {
    //     this.$axios
    //       .get(`homework/${this.$route.query.quiz_id}`)
    //       .then((response) => resolve(response))
    //       .catch((response) => reject(response));
    //   });
    // },
    // getQuestions: function () {
    //   return new Promise((resolve, reject) => {
    //     this.$axios
    //       .get(`homework/${this.$route.query.quiz_id}/questions`)
    //       .then((response) => resolve(response))
    //       .catch((response) => reject(response));
    //   });
    // },
    storeHomework: function () {
      let vm = this;
      return new Promise((resolve, reject) => {
        this.$axios
          .post(`homework/create`, {
            data: {
              id: null,
              type: "homework",
              attributes: {
                quiz_type: "homework",
                quiz_time: vm.form.homework.quiz_time,
                classroom_id: vm.form.homework.classroom_id,
                classroom_class_session_id: vm.$route.params.id,
                start_at: vm.start_at_computed,
                end_at: vm.end_at_computed,
                // parent_quiz_id: vm.$route.query.quiz_id,
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
          .post(`homework/${quiz_id}/update-questions`, {
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
      this.storeHomework()
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
