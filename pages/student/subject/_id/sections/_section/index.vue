<template>
  <div class="subject-section">
    <!-- DESCRIPTION -->
    <div v-if="currentSection.description" class="gray pt-4 p-3">
      <div class="mb-20" v-html="currentSection.description" />
    </div>

    <!-- SECTIONS -->
    <template v-if="nestedSections.length > 0">
      <div class="row">
        <NestedSection
          v-for="section in nestedSections"
          :key="section.id"
          class="col-lg-3 col-md-4 col-sm-6 p-l3 width-20"
          :resource="resources"
          :section="section"
          :subject="subject"
        />
      </div>
    </template>

    <hr v-if="nestedSections.length > 0 && resources.length > 0" />

    <!-- RESOURCES -->
    <template v-if="resources.length > 0 && $route.params.section">
      <div class="row">
        <SectionResource
          v-for="resource in resources"
          :key="resource.id"
          class="col-12 col-md-6 col-xl-4"
          :resource="resource"
          :section-id="$route.params.section"
          :subject="subject"
        />
      </div>
    </template>
  </div>
</template>

<script>
import initMathJaxLib from "~/utilities/mathJax";
import NestedSection from "@/components/subjects/student/sectionsCards/NestedSection.vue";
import SectionResource from "@/components/subjects/student/sectionsCards/SectionResource.vue";
import mixin from "@/mixins/mixin";
export default {
  name: "NestedSections",
  components: { NestedSection, SectionResource },

  mixins: [mixin],
  props: ["subject"],

  data: function () {
    return {
      currentSection: {},
      resources: [],
      nestedSections: [],
    };
  },

  watch: {
    "$route.params.section": {
      immediate: true,
      handler: function (sectionId, o) {
        if (!sectionId) return;
        this.getSectionDetails(sectionId);
      },
    },
  },
  mounted() {
    initMathJaxLib();
  },
  created() {
    if (!this.subject.is_subscribe) {
      this.$router.push(this.localePath(`/student/subject/${this.subject.id}`));
    }
  },

  beforeDestroy() {
    this.$emit("update-breadcrumb", null);
  },

  methods: {
    getSectionDetails(sectionId) {
      this.nestedSections = [];
      this.resources = [];
      this.$axios
        .get(`/student/subjects/view-subject-format-subject/${sectionId}`)
        .then((response) => {
          this.currentSection = this.$formatter().deserialize(response.data);
          this.$emit("update-breadcrumb", this.currentSection.title);
          console.log(this.currentSection);
          const sectionHasNestedSections =
            this.currentSection.subjectFormatSubjects &&
            this.currentSection.subjectFormatSubjects.data &&
            this.currentSection.subjectFormatSubjects.data.length > 0;

          if (sectionHasNestedSections) {
            this.nestedSections = this.currentSection.subjectFormatSubjects.data;
          }

          const sectionHasResources =
            this.currentSection.resourceSubjectFormatSubject &&
            this.currentSection.resourceSubjectFormatSubject.data &&
            this.currentSection.resourceSubjectFormatSubject.data.length > 0;

          // if (!sectionHasResources) {
          //   this.$toast.info("Resources has no data");
          // }
          if (sectionHasResources) {
            this.resources = this.currentSection.resourceSubjectFormatSubject.data;
          }

          // if (!(sectionHasNestedSections || sectionHasResources)) {
          //   this.$toast.info("section has no data");
          // }
        });
    },
  },
};
</script>
<style>
figure table {
  direction: ltr;
}
</style>
