<template>
  <NuxtLink :to="localePath({ path: `/student/subject/${subject.id}` })">
    <div class="subject-box p-0" :style="`background-color:${subject.color}`">
      <div class="img">
        <img
          :alt="subject.name"
          :src="subject.subject_image"
          @error="setDefaultImage"
        >
      </div>
      <div class="text-center position-relative w-100 py-1">
        <Poptip :content="subject.name" trigger="hover">
          <p class="content small-font">
            {{ subject.name | firstWord }}
          </p>
        </Poptip>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: "MiniSubjectCard",
  filters: {
    firstWord: function (val) {
      return `${val.split(" ")[0]} `;
    },
  },
  props: ["subject"],

  methods: {
    setDefaultImage(e) {
      e.target.src = require("~/assets/img/abc.png");
    },
  },
};
</script>
<style></style>
