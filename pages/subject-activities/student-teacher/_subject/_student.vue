<template>
  <div>
    <ActivitiesPanel current-user-type="student-teacher" />
  </div>
</template>

<script>
import ActivitiesPanel from "~/components/activities/subject/Panel.vue";

export default {
  name: "StudentActivitiesPage",
  components: { ActivitiesPanel },
  layout: "student-teacher",
};
</script>
