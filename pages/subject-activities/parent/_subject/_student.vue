<template>
  <div>
    <ActivitiesPanel current-user-type="parent" />
  </div>
</template>

<script>
import ActivitiesPanel from "~/components/activities/subject/Panel.vue";

export default {
  name: "StudentActivitiesPage",
  components: { ActivitiesPanel },
  layout: "parent",
};
</script>
