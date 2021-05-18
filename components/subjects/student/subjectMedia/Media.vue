<template>
  <div>
    <!-- PDF -->
    <div v-if="mediaType == 'pdf'">
      <object
        class="w-100"
        :data="media.url"
        style="height: 70vh;"
        type="application/pdf"
      />
    </div>

    <!-- DOCUMENT -->
    <div
      v-else-if="mediaType == 'document'"
      class="subject-media-document mb-4 p-2"
    >
      <iframe
        frameborder="0"
        :src="`https://view.officeapps.live.com/op/embed.aspx?src=${media.url}`"
        style="width: 100%; min-height: 500px; height: 70vh;"
      />
      <div class="text-center">
        <a :href="media.url" target="_blank">
          <i class="fa fa-download" />
          {{ $t("download") }}
        </a>
      </div>
    </div>

    <!-- IMAGE -->
    <div v-else-if="mediaType == 'image'">
      <img class="img-fluid" max-width="100%" :src="media.url" >
    </div>

    <!-- AUDIO -->
    <div v-else-if="mediaType == 'audio'">
      <audio controls>
        <source :src="media.url" />
        Your browser does not support the audio element.
      </audio>
    </div>

    <!-- VIDEO -->
    <div v-else-if="mediaType == 'video'">
      <video controls height="500" width="100%">
        <source :src="media.url" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubjectMediaType",
  props: ["media", "mediaType"],
};
</script>
