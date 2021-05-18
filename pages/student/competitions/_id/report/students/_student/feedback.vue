<template>
  <feedbackComp />
</template>

<script>
import Feedback from "@/components/competition/Feedback";

export default {
  name: "CompetitionFeedback",

  components: {
    feedbackComp: Feedback,
  },

  layout: "default",
};
</script>
