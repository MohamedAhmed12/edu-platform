<template>
  <div class="video-side" style="width: 100%;">
    <div class="session-videos row">
      <div id="subscriber" class="col" />
      <div id="publisher" class="col" />
    </div>
    <videoControl />
  </div>
</template>

<script>
const components = {
  videoControl: () => import("./control/videoControl.vue"),
};

export default {
  components,
};
</script>

<style scoped></style>
