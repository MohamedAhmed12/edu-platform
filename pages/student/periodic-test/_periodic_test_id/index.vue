<template>
  <div>
    <QuizStudentForm :quiz-uri="quizUri" :start-uri="startUri" type="periodic_test" />
  </div>
</template>

<script>
import QuizStudentForm from "@/components/quizzes/QuizStudentForm";

export default {
  name: "PeriodicTestFormStudent",
  components: {
    QuizStudentForm,
  },
  data() {
    return {};
  },
  computed: {
    quizUri() {
      return `student/periodic-test/${this.$route.params.periodic_test_id}`;
    },
    startUri() {
      return `student/periodic-test/start-periodic-test/${this.$route.params.periodic_test_id}`;
    },
  },
  mounted() {
    console.log("HERE");
  },
  methods: {},
};
</script>

<style scoped></style>
