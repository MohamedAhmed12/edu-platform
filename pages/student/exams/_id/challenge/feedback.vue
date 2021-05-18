<template>
  <Feedback :feedback-endpoint="feedbackEndpoint" />
</template>

<script>
import Feedback from "@/components/exams/student/Feedback";

export default {
  components: {
    Feedback,
  },
  layout: "default",

  computed: {
    feedbackEndpoint() {
      return `student/exams/${this.$route.params.id}/exam-challenge`;
    },
  },
};
</script>
