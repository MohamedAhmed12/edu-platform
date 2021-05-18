<template>
  <div>
    <div class="row gray mr-0 pt-5">
      <div class="col-md-12 pdf-block mb-25">
        <h3 v-if="/^/.test(details.title)" v-html="details.title" />
        <h3 v-else>
          {{ details.title }}
        </h3>
      </div>
      <div class="col-md-12 pdf-block mb-4">
        <img
          v-for="(imageLink, index) in imageLinks"
          :key="index"
          :src="imageLink.url"
          style="max-width: 100%;"
        />
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
  name: "PictureResource",
  props: ["details"],
  computed: {
    imageLinks: function () {
      if (this.details.pictureDataMedia) {
        return this.details.pictureDataMedia.data;
      }
    },
  },
  mounted() {
    initMathJaxLib();
  },
};
</script>
