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
      return `exams/${this.$route.params.id}`;
    },
  },
};
</script>
