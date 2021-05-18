<template>
  <feedbackComp />
</template>

<script>
import Feedback from "@/components/exams/instructor/Feedback";

export default {
  name: "ExamReport",

  components: {
    feedbackComp: Feedback,
  },

  layout: "default",
};
</script>
