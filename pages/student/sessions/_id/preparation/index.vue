<template>
  <div class="subject-section container">
    <!-- DESCRIPTION -->
    <div v-if="preparation.student_preparation" class="pt-3">
      <h3
        class="title-bg title-font"
        v-html="preparation.student_preparation"
      />
    </div>

    <!-- RESOURCES -->
    <!-- <div class="row">
      <div class="col-lg-12">
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/Y2VlTpe4srk"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div> -->

    <div class="row">
      <h1 class="col-12">
        {{ $t("preparation_media") }}
      </h1>
      <div v-for="media in preparationMedia" class="col-4 col-lg-3">
        <div class="subject-progress card-hieght">
          <div class="up">
            <div class="img m-auto">
              <i :class="`fas fa-${getIcon(media.extension)}`" />
            </div>
          </div>
          <h3 class="resource-title h3 text-center">
            {{ media.file_name }}
          </h3>
          <div class="down">
            <nuxt-link
              class="button text-center btn-block mt-3 m-0"
              :prefetch="false"
              :to="`/student/sessions/${$route.params.id}/preparation/media/${media.id}`"
            >
              {{ $t("view") }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <h1 class="col-12">
        {{ $t("media_shared_through_session") }}
      </h1>
      <div v-for="media in sessionSharedMedia" class="col-4 col-lg-3">
        <div class="subject-progress card-hieght">
          <div class="up">
            <div class="img m-auto">
              <i :class="`fas fa-${getIcon(media.attributes.extension)}`" />
            </div>
          </div>
          <h3 class="resource-title h3 text-center">
            {{ media.attributes.file_name }}
          </h3>
          <div class="down">
            <a
              class="button text-center btn-block mt-3 m-0"
              download
              :href="media.attributes.url"
              target="_blank"
            >
              {{ $t("download") }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Formatter } from "sarala-json-api-data-formatter";
import initMathJaxLib from "~/utilities/mathJax";
import "~/assets/css/subject-view.css";

export default {
  name: "StudentPreparation",
  data: function () {
    return {
      currentSection: {},
      resources: [],
      nestedSections: [],
      preparation: {},
      preparationMedia: [],
      sessionSharedMedia: [],
      quizzes: [],
    };
  },
  mounted() {
    this.getPreparation();
  },
  beforeRouteLeave(to, from, next) {
    if (to.params.hasOwnProperty("quiz_id")) {
      if (confirm("Are you sure ?")) next();
    }
  },
  methods: {
    getSessionSharedMedia(url) {
      if (!url) {
        return;
      }

      this.$axios
        .$get(url)
        .then((res) => {
          this.sessionSharedMedia = res.data;
        })
        .catch((err) => console.log(err));
    },
    getPreparation() {
      this.$axios
        .get(`student/session-preparation/${this.$route.params.id}`)
        .then((res) => {
          const returnRes = this.$formatter().deserialize(res.data);
          this.preparation = returnRes.session_preparations.data;
          this.preparationMedia = this.preparation.preparation_media.data;
          if (returnRes.actions.data && returnRes.actions.data.length) {
            this.getSessionSharedMedia(returnRes.actions.data[0].endpoint_url);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getIcon(extension) {
      switch (extension) {
        case "pdf":
          return "file-pdf";
        case "ashx":
          return "file";
        case "audio":
          return "volume-up";
        case "video":
          return "video";
        case "page":
          return "file-alt";
        case "flash":
          return "bolt";
        case "picture":
          return "image";
        case "image":
          return "image";
      }
      return "book-open";
    },
  },
};
</script>
