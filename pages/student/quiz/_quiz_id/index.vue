<template>
  <div>
    <QuizStudentForm :quiz-uri="quizUri" :start-uri="startUri" type="quiz" />
  </div>
</template>

<script>
import QuizStudentForm from "@/components/quizzes/QuizStudentForm";

export default {
  name: "QuizStudent",
  components: {
    QuizStudentForm,
  },
  data() {
    return {};
  },
  computed: {
    quizUri() {
      return `student/quizzes/${this.$route.params.quiz_id}`;
    },
    startUri() {
      return `student/quizzes/start-quiz/${this.$route.params.quiz_id}`;
    },
  },
  mounted() {
    console.log("HERE");
  },
  methods: {},
};
</script>

<style scoped></style>
