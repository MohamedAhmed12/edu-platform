<template>
  <div>
    <div class="row pt-3 gray mx-0">
      <div class="col-md-12 pdf-block mb-25">
        <h3>{{ details.title }}</h3>
      </div>
      <div class="col-md-12 mb-4">
        <embed class="w-100" :src="details.flashDataMedia.data.url" />
      </div>

      <div class="col-md-12 pdf-block">
        <div
          v-if="/^/.test(details.description)"
          class="mb-20"
          v-html="details.description"
        />
        <p v-else class="mb-20">
          {{ details.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import initMathJaxLib from "~/utilities/mathJax";
export default {
  name: "FlashResource",
  props: ["details"],
  mounted() {
    initMathJaxLib();
  },
};
</script>
