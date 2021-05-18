<template>
  <Competing />
</template>

<script>
const components = {
  Competing: () => import("@/components/competition/Competing.vue"),
};

export default {
  components,
};
</script>
