<template>
  <div>
    <ExamResultsPanel />
  </div>
</template>

<script>
import ExamResultsPanel from "~/components/activities/exam/Panel.vue";

export default {
  name: "ExamResultsPage",
  components: { ExamResultsPanel },
  layout: "parent",
};
</script>
