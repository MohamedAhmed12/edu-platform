<template>
  <NuxtLink :to="localePath('home-student')">
    <div class="subject-box" :style="'background-color: ' + subject.color">
      <div class="img">
        <img
          :alt="subject.name"
          :src="subject.subject_image"
          @error="setDefaultImage"
        />
      </div>
      <p class="content small-font">
        {{ subject.name }}
      </p>
    </div>
  </NuxtLink>
</template>
<script>
export default {
  props: ["subject"],
  data() {
    return {
      viewAction: {
        data: this.subject,
        key: "view_subject",
      },
    };
  },
  computed: {},
  mounted() {},
  methods: {
    setDefaultImage(e) {
      e.target.src = require("~/assets/img/abc.png");
    },
  },
};
</script>
