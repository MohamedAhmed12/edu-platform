<template>
  <section>
    <PeriodicTestForm
      :end_at="true"
      :questions="form.questions"
      :quiz="form.periodic_test"
      :start_at="true"
    >
      <div class="col-12">
        <div class="form-group">
          <label for="grade_class_id">{{ $t("Class Grade") }}</label>
          <select
            id="grade_class_id"
            v-model="form.periodic_test.grade_class_id"
            class="form-control"
          >
            <option :value="null">
              {{ $t("Please Select") }}
            </option>
            <option
              v-for="grade of grades"
              v-key="getRandomKey()"
              :value="grade.id"
            >
              {{ grade.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-12">
        <div class="form-group">
          <label for="subject_id">{{ $t("Subject") }}</label>
          <select
            id="subject_id"
            v-model="form.periodic_test.subject_id"
            class="form-control"
          >
            <option :value="null">
              {{ $t("Please Select") }}
            </option>
            <option
              v-for="subject of subjects"
              v-key="getRandomKey()"
              :value="subject.id"
            >
              {{ subject.name }}
            </option>
          </select>
        </div>
      </div>
    </PeriodicTestForm>

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
import PeriodicTestForm from "@/components/quizzes/QuizForm";

export default {
  components: { PeriodicTestForm },
  layout: "default",
  data() {
    return {
      form: {
        periodic_test: {
          quiz_type: "periodic_test",
          end_at: null,
          start_at: null,
          end_at_hour: null,
          end_at_minute: null,
          start_at_hour: null,
          start_at_minute: null,
          grade_class_id: null,
        },
        questions: [],
      },
    };
  },
  computed: {
    start_at_computed() {
      return this.getDate("start_at");
    },
    end_at_computed() {
      return this.getDate("end_at");
    },
  },
  mounted() {
    this.getClassesAndSubjects();
    this.getPeriodicTest()
      .then(this.handleGettingPeriodicTest)
      .then(this.handleGettingPeriodicTestQuestions);
  },
  methods: {
    update() {
      this.updatePeriodicTest()
        .then(this.handleTestUpdateSuccess)
        .then(this.handleQuestionsUpdateSuccess)
        .catch(this.handleUpdateError);
    },
    getClassesAndSubjects() {
      this.$axios
        .get(`/look-up?include=classes,subjects`)
        .then((response) => {
          let formatter = new Formatter();
          let data = formatter.deserialize(response.data).data.pop();
          this.grades = data.classes.data;
          this.subjects = data.subjects.data;
        })
        .catch((error) => {});
    },
    getQuestions() {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`periodic-test/${this.$route.params.periodic_test_id}/questions`)
          .then((response) => resolve(response))
          .catch((response) => reject(response));
      });
    },
    getPeriodicTest() {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`periodic-test/${this.$route.params.periodic_test_id}`)
          .then((response) => resolve(response))
          .catch((response) => reject(response));
      });
    },
    updatePeriodicTest() {
      return new Promise((resolve, reject) => {
        this.$axios
          .put(`periodic-test/edit/${this.form.periodic_test.id}`, {
            data: {
              id: this.form.periodic_test.id,
              type: "periodic_test",
              attributes: {
                quiz_type: "periodic_test",
                end_at: this.end_at_computed,
                start_at: this.start_at_computed,
                subject_id: this.form.periodic_test.subject_id,
                grade_class_id: this.form.periodic_test.grade_class_id,
              },
            },
          })
          .then((response) => resolve(response))
          .catch((response) => reject(response));
      });
    },
    updateQuestions(periodic_test_id) {
      return new Promise((resolve, reject) => {
        for (let question of this.form.questions) {
          question.quiz_id = periodic_test_id;
        }
        this.$axios
          .post(`periodic-test/${periodic_test_id}/update-questions`, {
            data: {
              type: "periodic_test_question",
              id: periodic_test_id,
              attributes: {
                questions: this.form.questions,
              },
            },
          })
          .then((response) => resolve(response))
          .catch((response) => reject(response));
      });
    },
    //================================================
    // Secondary Functions
    //================================================
    handleUpdateError(error) {
      // console.log(error.response.errors);
      console.log(error.message);
      return this.$toast.error(error.message);
    },
    handleQuestionsUpdateSuccess() {
      this.$toast.success(this.$t("Success"));
      this.$router.go(-1);
    },
    handleTestUpdateSuccess(response) {
      return this.updateQuestions(response.data.data.id);
    },
    handleGettingPeriodicTest(response) {
      let formatter = new Formatter();
      let data = formatter.deserialize(response.data);
      this.form.periodic_test = data;

      if (data.start_at) {
        let start_at = data.start_at.split(" ")[1].split(":");
        this.form.periodic_test.start_at_hour = `${start_at[0]}`;
        this.form.periodic_test.start_at_minute = `${start_at[1]}`;
      }

      if (data.end_at) {
        let end_at = data.end_at.split(" ")[1].split(":");
        this.form.periodic_test.end_at_hour = `${end_at[0]}`;
        this.form.periodic_test.end_at_minute = `${end_at[1]}`;
      }

      return this.getQuestions();
    },
    handleGettingPeriodicTestQuestions(response) {
      let formatter = new Formatter();
      this.form.questions = formatter.deserialize(response.data).data;
    },
    //================================================
    // Helper Functions
    //================================================
    getDate(property) {
      let date,
        hour,
        minute = null;
      if (this.validateNestedProperties(this.form, "periodic_test", property)) {
        date = this.form.periodic_test[property].toISOString().split("T")[0];
      }
      if (
        this.validateNestedProperties(
          this.form,
          "periodic_test",
          `${property}_hour`
        )
      ) {
        hour = this.form.periodic_test[`${property}_hour`];
      }
      if (
        this.validateNestedProperties(
          this.form,
          "periodic_test",
          `${property}_minute`
        )
      ) {
        minute = this.form.periodic_test[`${property}_minute`];
      }

      return `${date} ${hour}:${minute}:00.000`;
    },
    getRandomKey() {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for (let i = 0; i < charactersLength; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    validateNestedProperties(obj, level, ...rest) {
      if (obj === undefined) return false;
      // eslint-disable-next-line no-prototype-builtins
      if (rest.length === 0 && obj.hasOwnProperty(level)) return true;
      return this.validateNestedProperties(obj[level], ...rest);
    },
  },
};
</script>
