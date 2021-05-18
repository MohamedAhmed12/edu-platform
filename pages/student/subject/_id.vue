<template>
  <div class="row mx-0">
    <div class="col-lg-1 px-lg-1 py-lg-2">
      <div v-if="subject.id" class="material-icons subject-icon">
        <!-- PARENT SECTIONS -->
        <nuxt-link
          class="material-icon folder"
          :prefetch="false"
          :to="localePath({ path: `/student/subject/${subject.id}/sections` })"
          @click="currentSectionTitle = null"
        >
          <img src="@/assets/img/folders.png" />
        </nuxt-link>

        <!-- MEDIA BUTTONS -->
        <nuxt-link
          v-for="(button, index) in mediaButtons"
          v-show="havingSubjectMedia(button.type) && !$route.params.section"
          :key="index"
          :class="`  material-icon ${button.class}`"
          :prefetch="false"
          :to="{
            path: localePath({ path: `/student/subject/${subject.id}/media` }),
            query: { meidaType: button.type },
          }"
        >
          <img :src="require(`@/assets/img/${button.image}`)" />
        </nuxt-link>
      </div>
    </div>
    <div class="col-lg-11 pt-2">
      <header class="subject-header mb-5 ml-0 ml-lg-2">
        <!-- UP name & subscribe|report -->
        <div class="d-flex">
          <div class="flex-grow">
            <ul
              class="subject-crumb p-0"
              :class="`${
                this.$i18n.locale == 'ar' ? 'breadcrumb-ar' : 'breadcrumb'
              }`"
            >
              <li class="mt-0">
                <nuxt-link
                  :prefetch="false"
                  :to="localePath({ path: `/student/subject/${subject.id}` })"
                  @click="currentSectionTitle = null"
                >
                  {{ subject.name }}
                </nuxt-link>
              </li>
              <li v-if="$route.params.section" class="mt-0">
                {{ currentSectionTitle }}
              </li>
            </ul>
          </div>
          <div>
            <button
              v-if="subject.id && !subject.is_subscribe"
              class="btn btn-success"
              @click="subscribe()"
            >
              {{ $t("subscribe") }}
            </button>
            <button
              v-if="subject.id && subject.is_subscribe"
              class="btn btn-danger"
              @click="openReportModal()"
            >
              {{ $t("report") }}
            </button>
          </div>
        </div>

        <!-- DOWN progress & price -->
        <div class="d-flex">
          <div class="flex-grow mr-auto">
            <div v-if="subject.is_subscribe" class="progress-container">
              <p class="progres-title">
                {{ $t("progress") }}
                ({{ subject.progress | decimalConvert }}%)
              </p>
              <div class="progress">
                <div class="fill" :style="`width: ${subject.progress}%;`" />
              </div>
            </div>
            <p v-else class="progres-title">
              {{ $t("not-subscribed") }}
            </p>
          </div>

          <div v-if="!subject.is_subscribe" class="d-flex align-items-end">
            <strong class="price">{{ subject.subscription_cost }} SAR</strong>
          </div>
        </div>
      </header>
      <!--      start media content-->
      <div class="ml-0 ml-lg-2">
        <nuxt-child
          v-if="subject.id"
          :key="`${subject.id}`"
          :subject="subject"
          @update-breadcrumb="currentSectionTitle = $event"
        />
      </div>
    </div>
  </div>
</template>

<script>
import "~/assets/css/subject-view.css";
export default {
  name: "ViewSubject",
  data: function () {
    return {
      subject: {},
      currentSectionTitle: null,

      mediaButtons: [
        { type: "pdf", class: "share", image: "share.png" },
        { type: "document", class: "word", image: "word.png" },
        { type: "image", class: "image", image: "image.svg" },
        { type: "audio", class: "music", image: "music.png" },
        { type: "video", class: "play-video", image: "Polygon3.png" },
      ],

      reportText: "",
    };
  },
  head() {
    return {};
  },

  // this watch is a hot fix for now as at some point in the life cycle nuxt reset 'this.subject'
  // while navigating to or from [sections and subject media]
  watch: {
    subject: {
      deep: true,
      handler(newSubject, oldSubject) {
        if (!newSubject.id) this.subject = oldSubject;
      },
    },
  },

  created() {
    const subjectId = this.$route.params.id;
    this.fetchSubject(subjectId);
  },
  methods: {
    fetchSubject(subjectId) {
      this.$axios
        .get(`student/subjects/view-subject/${subjectId}`)
        .then((response) => {
          this.subject = this.$formatter().deserialize(response.data);
          // console.log( this.subject)
        });
    },

    havingSubjectMedia(typeName) {
      const mediaTypes =
        this.subject.subjectMediaTypes && this.subject.subjectMediaTypes.data;
      if (!mediaTypes) return false;
      return mediaTypes.find((mediaType) => mediaType.type == typeName);
    },

    subscribe() {
      this.$axios
        .post(`student/subjects/subscribe/${this.subject.id}`)
        .then((response) => {
          this.subject.is_subscribe = true;
          this.$Message.info(response.data.meta.message);
        })
        .catch((error) => {
          error.response.data.errors.forEach(({ detail }) =>
            this.$toast.error(detail)
          );
        });
    },

    openReportModal() {
      this.$Modal.confirm({
        onOk: () => {
          this.sendReport();
        },
        okText: this.$t("report"),
        render: (h) => {
          return h("Input", {
            props: {
              type: "textarea",
              value: this.reportText,
              autofocus: true,
              placeholder: this.$t("report-placeholder"),
            },
            on: {
              input: (val) => {
                this.reportText = val;
              },
            },
          });
        },
      });
    },

    sendReport() {
      const url = `student/reports/${this.subject.id}/subject/${this.subject.id}`;
      const body = {
        data: {
          type: "user",
          id: "null",
          attributes: { report: this.reportText },
        },
      };

      this.$axios
        .post(url, body)
        .then((response) => {
          this.$Message.info(response.data.meta.message);
        })
        .catch((error) => {
          error.response.data.errors.forEach(({ detail }) =>
            this.$Message.error(detail)
          );
        });
    },
  },
};
</script>
