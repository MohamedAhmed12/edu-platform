<template>
  <div>
    <div class="row p-r-100 gray mx-0">
      <div class="col-md-12 pdf-block mb-25">
        <h3>{{ details.title }}</h3>
      </div>
    </div>
    <div class="row pt-3 mr-0">
      <div class="col-md-12 m-50 text-center m-t-100">
        <audio controls>
          <source :src="audioLink" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>

    <div class="row p-r-100 gray mx-0">
      <!-- <div class="col-md-12 pdf-block mb-25">
        <h3>{{ details.title }}</h3>
      </div> -->
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
  name: "AudioResource",
  props: ["details"],
  computed: {
    audioLink: function () {
      if (this.details.audio_type == "url") {
        return this.details.audio;
      }

      if (this.details.audioDataMedia) {
        return this.details.audioDataMedia.data.url;
      }
    },
  },
  mounted() {
    initMathJaxLib();
  },
};
</script>
