<template>
  <div>
    <div class="row pt-3 gray mx-0">
      <div class="col-md-12 pdf-block mb-25">
        <h3>{{ details.title }}</h3>
      </div>

      <div class="col-md-12 mb-4">
        <iframe
          v-if="details.video_type == 'url'"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="w-100"
          frameborder="0"
          :src="videoUrl"
          style="min-height: 500px;"
        />
        <video v-else controls height="500" width="100%">
          <!-- details.videoDataMedia.data.url -->
          <source :src="videoUrl" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
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
  name: "VideoResource",
  props: ["details"],
  computed: {
    videoUrl: function () {
      if (
        (this.details.video && this.details.video.includes("youtube.com")) ||
        (this.details.video && this.details.video.includes("youtu.be"))
      ) {
        return `https://www.youtube.com/embed/${this.getYoutubeVideoId(
          this.details.video
        )}`;
      }
      return this.details.videoDataMedia.data.url;
    },
  },
  mounted() {
    this.videoValidation();
    initMathJaxLib();
  },
  methods: {
    getYoutubeVideoId(url) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? match[2] : null;
    },
    videoValidation() {
      if (this.videoUrl == null) {
        this.$toast.error("No video-Url Attached");
      }
    },
  },
};
</script>
