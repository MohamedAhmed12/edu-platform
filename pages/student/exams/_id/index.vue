<template>
  <Examing />
</template>

<script>
const components = {
  Examing: () => import("@/components/exams/student/Examing.vue"),
};

export default {
  components,
};
</script>
