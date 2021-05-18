<template>
  <div class="col-12">
    <h2 class="mb-3">
      {{ media.file_name }}
    </h2>

    <SubjectMedia :media="media" :media-type="media.extension" />

    <div class="text-center mt-4">
      <a class="back-btn" href="#" @click.prevent="$router.back()">
        <i class="fa fa-list mr-1" />
        {{ $t("back") }}
      </a>
    </div>
  </div>
</template>

<script>
import SubjectMedia from "@/components/subjects/student/subjectMedia/Media.vue";

export default {
  data() {
    return {
      media: {},
      allowedExt: ["pdf", "document", "image", "audio", "video"],
    };
  },

  components: { SubjectMedia },

  mounted() {
    this.getMedia();
  },

  methods: {
    forceFileDownload() {
      if (this.allowedExt.includes(this.media.extension)) return;

      const link = document.createElement("a");
      link.href = this.media.url;
      link.target = "_blank";
      link.setAttribute("download", "file." + this.media.extension);
      document.body.appendChild(link);
      link.click();
      return this.$router.back();
    },
    getMedia() {
      this.$axios
        .$get(
          `student/session-preparation/single-media/${this.$route.params.media}`
        )
        .then((res) => {
          console.log(21);
          // this.media = 65656;
          this.media = this.$formatter().deserialize(res);
          this.forceFileDownload();
        });
    },
  },
};
</script>
