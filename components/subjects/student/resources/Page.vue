<template>
  <div>
    <div class="row pt-3 gray mx-0">
      <div class="col-md-12 mb-25">
        <h3>{{ details.title }}</h3>
      </div>
      <div class="col-md-12">
        <div
          v-if="/^/.test(details.page)"
          class="mb-20"
          v-html="details.page"
        />
        <p v-else class="mb-20">
          {{ details.page }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import initMathJaxLib from "~/utilities/mathJax";
// import wiris from "~/utilities/wiris";

export default {
  name: "PageResource",
  props: ["details"],
  mounted() {
    // if (process.browser) {
    //    wiris()
    // }
    initMathJaxLib();
  },
};
</script>
