<template>
  <div class="subject-resource">
    <PdfResource
      v-if="resource.id && resource.resource_slug == 'pdf'"
      :details="resource.details.data"
    />

    <AudioResource
      v-if="resource.id && resource.resource_slug == 'audio'"
      :details="resource.details.data"
    />

    <VideoResource
      v-if="resource.id && resource.resource_slug == 'video'"
      :details="resource.details.data"
    />

    <PageResource
      v-if="resource.id && resource.resource_slug == 'page'"
      :details="resource.details.data"
    />

    <FlashResource
      v-if="resource.id && resource.resource_slug == 'flash'"
      :details="resource.details.data"
    />

    <PictureResource
      v-if="resource.id && resource.resource_slug == 'picture'"
      :details="resource.details.data"
    />
  </div>
</template>

<script>
import PdfResource from "@/components/subjects/student/resources/Pdf.vue";
import PageResource from "@/components/subjects/student/resources/Page.vue";
import FlashResource from "@/components/subjects/student/resources/Flash.vue";
import AudioResource from "@/components/subjects/student/resources/Audio.vue";
import VideoResource from "@/components/subjects/student/resources/Video.vue";
import PictureResource from "@/components/subjects/student/resources/Picture.vue";
import mixin from "@/mixins/mixin";

export default {
  name: "SectionResource",
  components: {
    PdfResource,
    FlashResource,
    AudioResource,
    VideoResource,
    PictureResource,
    PageResource,
  },
  mixins: [mixin],
  props: ["subject"],
  data: function () {
    return {
      resource: {},
    };
  },
  watch: {
    "$route.params.section": {
      immediate: true,
      handler: function (sectionId) {
        if (!sectionId) return;
        this.getSectionDetails(sectionId);
      },
    },

    "$route.params.resource": {
      immediate: true,
      handler: function (resourceId) {
        if (!resourceId) return;
        this.getResourceDetails(resourceId);
      },
    },
  },
  beforeDestroy() {},
  methods: {
    getSectionDetails(sectionId) {
      this.$axios
        .get(`/student/subjects/view-subject-format-subject/${sectionId}`)
        .then((response) => {
          const sectionDetails = this.$formatter().deserialize(response.data);
          this.$emit("update-breadcrumb", sectionDetails.title);
        });
    },

    getResourceDetails(resourceId) {
      this.$axios
        .get(
          `/student/subjects/subject-format-subject/${this.$route.params.section}/resource-subject-format-subject/${this.$route.params.resource}`
        )
        .then((response) => {
          this.resource = this.$formatter().deserialize(response.data);
        });
    },
  },
};
</script>
