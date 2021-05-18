<template>
  <div>
    <QuizStudentForm
      :quiz-uri="homeworkUri"
      :start-uri="startUri"
      type="homework"
    />
  </div>
</template>

<script>
import QuizStudentForm from "@/components/quizzes/QuizStudentForm";

export default {
  name: "HomeworkStudentForm",
  components: {
    QuizStudentForm,
  },
  data() {
    return {};
  },
  computed: {
    homeworkUri() {
      return `student/homework/${this.$route.params.homework_id}`;
    },
    startUri() {
      return `student/homework/start-homework/${this.$route.params.homework_id}`;
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped></style>
