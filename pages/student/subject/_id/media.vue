<template>
  <div class="subject-media">
    <div v-if="currnetView == 'cards'" class="row">
      <SubjectMediaCard
        v-for="media in mediaFiles.data"
        :key="media.id"
        class="col-lg-3 mx-auto col-md-4 col-sm-6 p-l3 width-50"
        :media="media"
        :media-type="mediaFiles.typeName"
        @show-media="
          currnetView = 'media';
          currnetMedia = $event.media;
          currnetMedia.mediaType = $event.mediaType;
        "
      />
    </div>

    <div v-if="currnetView == 'media'">
      <h2 class="mb-3">
        {{ currnetMedia.file_name }}
      </h2>

      <SubjectMedia
        v-if="currnetView == 'media'"
        :media="currnetMedia"
        :media-type="currnetMedia.mediaType"
      />

      <div class="text-center mt-4">
        <a class="back-btn" href="#" @click.prevent="currnetView = 'cards'">
          <i class="fa fa-list mr-1" />
          {{ $t("back") }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import SubjectMedia from "@/components/subjects/student/subjectMedia/Media.vue";
import SubjectMediaCard from "@/components/subjects/student/subjectMedia/Card.vue";

export default {
  name: "Media",
  components: { SubjectMediaCard, SubjectMedia },
  props: ["subject"],

  data: function () {
    return {
      mediaFiles: {
        data: [],
        typeName: null,
      },
      currnetMedia: {},
      currnetView: "cards", // cards | media
    };
  },

  watch: {
    "$route.query.meidaType": {
      immediate: true,
      handler: function (typeName) {
        if (!typeName) {
          this.$router.push(
            this.localePath(`/student/subject/${this.$route.params.id}`)
          );
          return;
        }
        this.currnetView = "cards";
        this.mediaFiles = { data: [], typeName: null };
        this.fetchSubjectMedia(typeName);
      },
    },
  },

  methods: {
    fetchSubjectMedia(typeName) {
      if (
        !(
          this.subject &&
          this.subject.subjectMediaTypes &&
          this.subject.subjectMediaTypes.data
        )
      )
        return;

      const media = this.subject.subjectMediaTypes.data.find(
        (mediaType) => mediaType.type == typeName
      );

      const viewMediaAction = media.actions.data.find(
        (action) => action.key == "view_subject_media"
      );

      this.$axios.get(viewMediaAction.endpoint_url).then((response) => {
        this.mediaFiles = this.$formatter().deserialize(response.data);
        this.mediaFiles.typeName = typeName;
      });
    },
  },
};
</script>
