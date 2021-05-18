<template>
  <div>
    <div class="container">
      <div class="row mx-0">
        <div class="col-lg-10 mx-auto">
          <div
            class="mt-4over-view-text d-flex flex-column align-items-lg-center"
            v-html="subject.subject_library_text"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import initMathJaxLib from "~/utilities/mathJax";

export default {
  name: "Overview",
  props: ["subject"],
  mounted() {
    initMathJaxLib();
  },
};
</script>
