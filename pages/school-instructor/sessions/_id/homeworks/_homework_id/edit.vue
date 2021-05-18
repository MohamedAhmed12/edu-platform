<template>
  <section>
    <HomeworkForm
      :end_at="true"
      :questions="form.questions"
      :quiz="form.homework"
      :start_at="true"
    />

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
import HomeworkForm from "@/components/quizzes/QuizForm";

export default {
  components: { HomeworkForm },
  layout: "default",
  data() {
    return {
      form: {
        homework: {
          quiz_time: this.$route.params.quiz_time,
          classroom_class_session_id: this.$route.params.id,
          classroom_id: this.$route.query.classroom_id,
          start_at: null,
          start_at_hour: null,
          start_at_minute: null,
          end_at: null,
          end_at_hour: null,
          end_at_minute: null,
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
  mounted() {
    this.getHomework()
      .then((response) => {
        let formatter = new Formatter();
        let data = formatter.deserialize(response.data);
        this.form.homework = data;

        if (data.start_at) {
          let start_at = data.start_at.split(" ")[1].split(":");
          this.form.homework.start_at_hour = `${start_at[0]}`;
          this.form.homework.start_at_minute = `${start_at[1]}`;
        }

        if (data.end_at) {
          let end_at = data.end_at.split(" ")[1].split(":");
          this.form.homework.end_at_hour = `${end_at[0]}`;
          this.form.homework.end_at_minute = `${end_at[1]}`;
        }

        return this.getQuestions();
      })
      .then((response) => {
        let formatter = new Formatter();
        this.form.questions = formatter.deserialize(response.data).data;
      });
  },
  methods: {
    getHomework: function () {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`homework/${this.$route.params.homework_id}`)
          .then((response) => resolve(response))
          .catch((response) => reject(response));
      });
    },
    getQuestions: function () {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`homework/${this.$route.params.homework_id}/questions`)
          .then((response) => resolve(response))
          .catch((response) => reject(response));
      });
    },
    updateHomework: function () {
      let vm = this;
      return new Promise((resolve, reject) => {
        this.$axios
          .put(`homework/edit/${vm.form.homework.id}`, {
            data: {
              id: vm.form.homework.id,
              type: "homework",
              attributes: {
                quiz_type: "homework",
                classroom_id: vm.form.homework.classroom_id,
                classroom_class_session_id: this.$route.params.id,
                start_at: this.start_at_computed,
                end_at: this.end_at_computed,
              },
            },
          })
          .then((response) => resolve(response))
          .catch((response) => reject(response));
      });
    },
    updateQuestions: function (homework_id) {
      return new Promise((resolve, reject) => {
        for (let question of this.form.questions) {
          question.quiz_id = homework_id;
        }
        this.$axios
          .post(`homework/${homework_id}/update-questions`, {
            data: {
              type: "homework_question",
              id: homework_id,
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
      this.updateHomework()
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
